const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 255;
const MAX_SERVICE_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_URL_LENGTH = 500;

const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store'
        }
    });

const collapseWhitespace = (value) => value.replace(/\s+/g, ' ').trim();

const sanitizeText = (value, maxLength) => {
    if (typeof value !== 'string') {
        return '';
    }

    return collapseWhitespace(value).slice(0, maxLength);
};

const sanitizeMessage = (value) => {
    if (typeof value !== 'string') {
        return '';
    }

    return value.trim().slice(0, MAX_MESSAGE_LENGTH);
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const wantsJson = (request) => {
    const accept = request.headers.get('Accept') || '';
    return accept.includes('application/json');
};

const respond = (request, body, status = 200, state = 'success') => {
    if (wantsJson(request)) {
        return json(body, status);
    }

    return redirectToContact(request, state);
};

const redirectToContact = (request, state) => {
    const url = new URL(request.url);
    url.pathname = '/';
    url.search = '';
    url.hash = 'contact';
    url.searchParams.set('contact', state);
    return Response.redirect(url.toString(), 303);
};

const parseSubmission = async (request) => {
    const formData = await request.formData();

    return {
        name: sanitizeText(formData.get('name'), MAX_NAME_LENGTH),
        email: sanitizeText(formData.get('email'), MAX_EMAIL_LENGTH).toLowerCase(),
        service: sanitizeText(formData.get('service'), MAX_SERVICE_LENGTH) || 'General Enquiry',
        message: sanitizeMessage(formData.get('message')),
        pageUrl: sanitizeText(formData.get('page_url'), MAX_URL_LENGTH),
        honeypot: sanitizeText(formData.get('company'), 120),
        turnstileToken: sanitizeText(formData.get('cf-turnstile-response'), 2048)
    };
};

const verifyTurnstile = async (secret, token, ipAddress) => {
    const payload = new FormData();
    payload.set('secret', secret);
    payload.set('response', token);

    if (ipAddress) {
        payload.set('remoteip', ipAddress);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: payload
    });

    if (!response.ok) {
        throw new Error('Turnstile verification request failed.');
    }

    return response.json();
};

export const onRequestPost = async ({ request, env }) => {
    try {
        const submission = await parseSubmission(request);
        const ipAddress =
            request.headers.get('CF-Connecting-IP') ||
            request.headers.get('x-forwarded-for') ||
            '';
        const userAgent = sanitizeText(request.headers.get('user-agent'), 500);
        const referer = sanitizeText(request.headers.get('referer'), MAX_URL_LENGTH);

        if (submission.honeypot) {
            return respond(request, { success: true, message: 'Submission received.' }, 200, 'success');
        }

        if (!env.TURNSTILE_SECRET_KEY) {
            return respond(request, { success: false, message: 'TURNSTILE_SECRET_KEY is missing.' }, 500, 'error');
        }

        if (!env.CONTACTS_DB) {
            return respond(request, { success: false, message: 'CONTACTS_DB binding is missing.' }, 500, 'error');
        }

        if (!submission.name || !submission.email || !submission.message) {
            return respond(request, { success: false, message: 'Name, email, and message are required.' }, 400, 'error');
        }

        if (!isValidEmail(submission.email)) {
            return respond(request, { success: false, message: 'Please enter a valid email address.' }, 400, 'error');
        }

        if (!submission.turnstileToken) {
            return respond(request, { success: false, message: 'Please complete the verification challenge.' }, 400, 'error');
        }

        const turnstile = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, submission.turnstileToken, ipAddress);

        if (!turnstile.success) {
            return respond(request, { success: false, message: 'Verification failed. Please try again.' }, 400, 'error');
        }

        const createdAt = new Date().toISOString();

        await env.CONTACTS_DB.prepare(`
            INSERT INTO contact_submissions (
                created_at,
                name,
                email,
                service,
                message,
                page_url,
                ip_address,
                user_agent,
                referer,
                turnstile_hostname
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
            .bind(
                createdAt,
                submission.name,
                submission.email,
                submission.service,
                submission.message,
                submission.pageUrl || request.url,
                ipAddress,
                userAgent,
                referer,
                sanitizeText(turnstile.hostname, 255)
            )
            .run();

        return respond(
            request,
            {
                success: true,
                message: 'Thanks. Your enquiry has been received and stored.'
            },
            200,
            'success'
        );
    } catch (error) {
        return respond(
            request,
            {
                success: false,
                message: error.message || 'The form could not be submitted.'
            },
            500,
            'error'
        );
    }
};
