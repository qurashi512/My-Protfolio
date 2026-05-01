// ========================================
// DARK MODE THEME SWITCHING
// ========================================

let currentTheme = localStorage.getItem('theme') || 'light';
let currentLanguage = localStorage.getItem('language') || 'en';

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    applyLanguage(currentLanguage);
    initHamburgerMenu();
    initLangDropdown();
    initFormHandler();
    setActiveNav();
    showScrollToTop();
});

function applyTheme(theme) {
    currentTheme = theme;
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
}

// ========================================
// LANGUAGE SWITCHING SYSTEM
// ========================================

const languages = {
    en: { home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact' },
    de: { home: 'Startseite', about: 'Über mich', projects: 'Projekte', contact: 'Kontakt' },
    ar: { home: 'الرئيسية', about: 'عني', projects: 'المشاريع', contact: 'تواصل' }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-en], [data-de], [data-ar]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            element.innerHTML = element.getAttribute(`data-${lang}`);
        }
    });

    const placeholders = {
        en: { name: 'John Doe', email: 'john@example.com', subject: 'Ausbildung Inquiry', message: 'Your message here...' },
        de: { name: 'Max Mustermann', email: 'max@beispiel.de', subject: 'Ausbildungsanfrage', message: 'Ihre Nachricht hier...' },
        ar: { name: 'محمد أحمد', email: 'example@mail.com', subject: 'استفسار عن تدريب', message: 'اكتب رسالتك هنا...' }
    };
    const ph = placeholders[lang] || placeholders.en;
    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    if (nameInput)    nameInput.placeholder    = ph.name;
    if (emailInput)   emailInput.placeholder   = ph.email;
    if (subjectInput) subjectInput.placeholder = ph.subject;
    if (messageInput) messageInput.placeholder = ph.message;

    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    document.documentElement.lang = lang;

    const currentLangText = document.getElementById('current-lang');
    if (currentLangText) {
        const langMap = { 'en': 'English', 'de': 'Deutsch', 'ar': 'العربية' };
        currentLangText.textContent = langMap[lang];
    }

    localStorage.setItem('language', lang);
}

function applyLanguage(lang) {
    setLanguage(lang);
}

// ========================================
// HAMBURGER MENU
// ========================================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========================================
// FORM HANDLER
// ========================================

function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const lang = currentLanguage;

        const messages = {
            en: {
                sending: 'Sending...',
                success: 'Message sent successfully! I\'ll get back to you soon.',
                error: 'Failed to send. Please try again or email me directly.',
                invalid: 'Please enter a valid email address.'
            },
            de: {
                sending: 'Senden...',
                success: 'Nachricht erfolgreich gesendet! Ich melde mich bald.',
                error: 'Senden fehlgeschlagen. Bitte versuche es erneut.',
                invalid: 'Bitte gib eine gültige E-Mail-Adresse ein.'
            },
            ar: {
                sending: 'جارٍ الإرسال...',
                success: 'تم إرسال رسالتك بنجاح! سأرد عليك قريباً.',
                error: 'فشل الإرسال. حاول مجدداً أو راسلني مباشرة.',
                invalid: 'يرجى إدخال بريد إلكتروني صحيح.'
            }
        };

        const m = messages[lang] || messages.en;

        const emailInput = form.querySelector('#email');
        if (emailInput && !isValidEmail(emailInput.value)) {
            showNotification('⚠️ ' + m.invalid, 'error');
            emailInput.focus();
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>' + m.sending + '</span>';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showNotification('✅ ' + m.success, 'success');
                form.reset();
            } else {
                showNotification('❌ ' + m.error, 'error');
            }
        } catch (err) {
            showNotification('❌ ' + m.error, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.style.cssText =
        'position:fixed;top:100px;right:20px;padding:16px 24px;' +
        'background:' + (type === 'success' ? '#10b981' : '#ef4444') + ';' +
        'color:white;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);' +
        'z-index:2000;animation:slideIn 0.3s ease-out;max-width:300px;font-weight:500;';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// SMOOTH SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-category, .cert-card, .project-detailed, .timeline-item, .soft-skill, .contact-method, .social-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// ACTIVE NAV LINK
// ========================================

function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function showScrollToTop() {
    let scrollBtn = document.getElementById('scrollToTop');

    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollToTop';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.style.cssText =
            'position:fixed;bottom:30px;right:30px;width:50px;height:50px;' +
            'background:var(--primary-color);color:white;border:none;border-radius:50%;' +
            'cursor:pointer;display:none;align-items:center;justify-content:center;' +
            'z-index:998;font-size:1.25rem;transition:all 0.3s ease;' +
            'box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);';

        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.background = 'var(--primary-dark)';
            scrollBtn.style.transform = 'scale(1.1)';
        });
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.background = 'var(--primary-color)';
            scrollBtn.style.transform = 'scale(1)';
        });

        document.body.appendChild(scrollBtn);
    }

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = document.documentElement.scrollTop > 300 ? 'flex' : 'none';
    });
}

// ========================================
// THEME TOGGLE - يُستدعى من onclick في HTML
// ========================================

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    }
}

// ========================================
// LANGUAGE DROPDOWN
// ========================================

function initLangDropdown() {
    const langDropdown = document.querySelector('.lang-dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    if (!langDropdown || !dropdownContent) return;

    langDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = dropdownContent.style.display === 'block';
        dropdownContent.style.display = isVisible ? 'none' : 'block';
    });

    dropdownContent.querySelectorAll('a[data-lang]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = link.getAttribute('data-lang');
            currentLanguage = lang;
            setLanguage(lang);
            dropdownContent.style.display = 'none';
        });
    });

    document.addEventListener('click', () => {
        dropdownContent.style.display = 'none';
    });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👋 Welcome to Gorashe Suliman\'s Portfolio!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cGitHub: github.com/qurashi512', 'color: #6b7280;');
console.log('%cEmail: gorashe.suliman@outlook.com', 'color: #6b7280;');
