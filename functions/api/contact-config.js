const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store'
        }
    });

export const onRequestGet = async ({ env }) => {
    return json({
        turnstileSiteKey: env.TURNSTILE_SITE_KEY || null,
        storageReady: Boolean(env.CONTACTS_DB)
    });
};
