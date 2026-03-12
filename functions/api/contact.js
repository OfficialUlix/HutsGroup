const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 255;
const MAX_SERVICE_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_URL_LENGTH = 500;
const ALLOWED_SERVICES = new Set([
    'General Enquiry',
    'Rust Removal',
    'Paint Stripping',
    'Brick/Stone Cleaning',
    'Automotive',
    'Industrial Application'
]);

const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
            'allow': 'POST',
            'x-content-type-options': 'nosniff'
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

const normalizeService = (value) => {
    const service = sanitizeText(value, MAX_SERVICE_LENGTH);
    return ALLOWED_SERVICES.has(service) ? service : 'General Enquiry';
};

const parseSubmission = async (request) => {
    const formData = await request.formData();

    return {
        name: sanitizeText(formData.get('name'), MAX_NAME_LENGTH),
        email: sanitizeText(formData.get('email'), MAX_EMAIL_LENGTH).toLowerCase(),
        service: normalizeService(formData.get('service')),
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

export const onRequest = async ({ request, env }) => {
    if (request.method !== 'POST') {
        return json(
            {
                success: false,
                message: 'Method not allowed.'
            },
            405
        );
    }

    try {
        const submission = await parseSubmission(request);
        const ipAddress =
            request.headers.get('CF-Connecting-IP') ||
            request.headers.get('x-forwarded-for') ||
            '';
        const userAgent = sanitizeText(request.headers.get('user-agent'), 500);
        const referer = sanitizeText(request.headers.get('referer'), MAX_URL_LENGTH);

        if (submission.honeypot) {
            return json({ success: true, message: 'Submission received.' });
        }

        if (!env.TURNSTILE_SECRET_KEY) {
            return json({ success: false, message: 'TURNSTILE_SECRET_KEY is missing.' }, 500);
        }

        if (!env.CONTACTS_DB) {
            return json({ success: false, message: 'CONTACTS_DB binding is missing.' }, 500);
        }

        if (!submission.name || !submission.email || !submission.message) {
            return json({ success: false, message: 'Name, email, and message are required.' }, 400);
        }

        if (!isValidEmail(submission.email)) {
            return json({ success: false, message: 'Please enter a valid email address.' }, 400);
        }

        if (!submission.turnstileToken) {
            return json({ success: false, message: 'Please complete the verification challenge.' }, 400);
        }

        const turnstile = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, submission.turnstileToken, ipAddress);

        if (!turnstile.success) {
            return json({ success: false, message: 'Verification failed. Please try again.' }, 400);
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

        return json({
            success: true,
            message: 'Thanks. Your enquiry has been received and stored.'
        });
    } catch (error) {
        return json(
            {
                success: false,
                message: error.message || 'The form could not be submitted.'
            },
            500
        );
    }
};
