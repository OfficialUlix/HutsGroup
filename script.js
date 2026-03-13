document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Background Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                // Change icon if using FontAwesome, or just simple logic
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Cookie Consent ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    
    if (!localStorage.getItem('cookieConsent')) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // --- Cloudflare Contact Form ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const statusBox = document.getElementById('contact-form-status');
        const submitButton = document.getElementById('contact-submit');
        const submitLabel = submitButton ? submitButton.querySelector('span') : null;
        const turnstileShell = document.getElementById('turnstile-widget');
        const turnstileContainer = document.getElementById('turnstile-container');
        const turnstileLoading = contactForm.querySelector('[data-turnstile-loading]');
        const pageUrlField = document.getElementById('page-url-field');

        let turnstileWidgetId = null;
        let turnstileSiteKey = null;

        const setStatus = (type, message) => {
            if (!statusBox) {
                return;
            }

            statusBox.hidden = false;
            statusBox.className = `form-status is-${type}`;
            statusBox.textContent = message;
        };

        const clearStatus = () => {
            if (!statusBox) {
                return;
            }

            statusBox.hidden = true;
            statusBox.className = 'form-status';
            statusBox.textContent = '';
        };

        const setSubmitting = (isSubmitting) => {
            if (!submitButton || !submitLabel) {
                return;
            }

            submitButton.disabled = isSubmitting;
            submitLabel.textContent = isSubmitting ? 'Sending...' : 'Get Your Quote';
        };

        const setTurnstileLoading = (message) => {
            if (!turnstileLoading) {
                return;
            }

            turnstileLoading.hidden = false;
            turnstileLoading.textContent = message;
        };

        const hideTurnstileLoading = () => {
            if (!turnstileLoading) {
                return;
            }

            turnstileLoading.hidden = true;
        };

        const waitForTurnstile = async () => {
            if (window.turnstile) {
                return window.turnstile;
            }

            return new Promise((resolve, reject) => {
                const timeoutId = window.setTimeout(() => {
                    window.removeEventListener('turnstile:ready', handleReady);
                    reject(new Error('Secure verification failed to load.'));
                }, 10000);

                const handleReady = () => {
                    window.clearTimeout(timeoutId);
                    resolve(window.turnstile);
                };

                window.addEventListener('turnstile:ready', handleReady, { once: true });
            });
        };

        const loadContactConfig = async () => {
            const response = await fetch('/api/contact-config', {
                cache: 'no-store',
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Contact form configuration could not be loaded.');
            }

            return response.json();
        };

        const syncPageUrl = () => {
            if (pageUrlField) {
                pageUrlField.value = window.location.href;
            }
        };

        const readUrlState = () => {
            const params = new URLSearchParams(window.location.search);
            const formState = params.get('contact');

            if (!formState) {
                return;
            }

            if (formState === 'success') {
                setStatus('success', 'Thanks. Your enquiry has been received and stored.');
            } else if (formState === 'error') {
                setStatus('error', 'The form could not be submitted. Please try again or use WhatsApp.');
            }

            params.delete('contact');
            const nextQuery = params.toString();
            const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
            window.history.replaceState({}, document.title, nextUrl);
        };

        const renderTurnstile = async () => {
            if (!turnstileShell || !turnstileContainer) {
                throw new Error('Turnstile container is missing from the contact form.');
            }

            const [config, turnstile] = await Promise.all([
                loadContactConfig(),
                waitForTurnstile()
            ]);

            turnstileSiteKey = config.turnstileSiteKey;

            if (!turnstileSiteKey) {
                throw new Error('Turnstile site key is missing in Cloudflare Pages settings.');
            }

            turnstileShell.classList.add('is-ready');
            setTurnstileLoading('Loading secure verification...');

            turnstileWidgetId = turnstile.render(turnstileContainer, {
                sitekey: turnstileSiteKey,
                theme: 'dark',
                callback: () => {
                    hideTurnstileLoading();
                },
                'error-callback': () => {
                    setTurnstileLoading('Secure verification failed to load.');
                    setStatus('error', 'Secure verification failed to render. Please refresh the page and try again.');
                },
                'expired-callback': () => {
                    setStatus('info', 'Verification expired. Please complete it again before submitting.');
                }
            });
        };

        syncPageUrl();
        readUrlState();
        setSubmitting(true);

        renderTurnstile()
            .then(() => {
                clearStatus();
                hideTurnstileLoading();
                setSubmitting(false);
            })
            .catch((error) => {
                setTurnstileLoading('Secure verification unavailable.');
                setSubmitting(true);
                setStatus('info', `${error.message} Please use WhatsApp or email until this is configured.`);
            });

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearStatus();
            syncPageUrl();

            const turnstileToken = contactForm.querySelector('[name="cf-turnstile-response"]');

            if (!turnstileToken || !turnstileToken.value) {
                setStatus('error', 'Please complete the verification before submitting.');
                return;
            }

            setSubmitting(true);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        Accept: 'application/json'
                    }
                });

                const payload = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(payload.message || 'Submission failed.');
                }

                contactForm.reset();
                syncPageUrl();
                setStatus('success', payload.message || 'Thanks. Your enquiry has been received.');

                if (window.turnstile && turnstileWidgetId !== null) {
                    window.turnstile.reset(turnstileWidgetId);
                }
            } catch (error) {
                setStatus('error', error.message || 'The form could not be submitted. Please try again.');
            } finally {
                setSubmitting(false);
            }
        });
    }
});
