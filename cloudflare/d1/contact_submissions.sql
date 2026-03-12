CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    page_url TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referer TEXT,
    turnstile_hostname TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
    ON contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
    ON contact_submissions (email);
