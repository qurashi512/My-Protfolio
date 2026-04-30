// ========================================
// DARK MODE THEME SWITCHING
// ========================================

let currentTheme = localStorage.getItem('theme') || 'light';

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    initThemeToggle();
    applyLanguage(currentLanguage);
    initHamburgerMenu();
    initFormHandler();
    setActiveNav();
    showScrollToTop();
});

/**
 * Apply theme to document
 */
function applyTheme(theme) {
    currentTheme = theme;
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', theme);
    updateThemeLabel();
}

/**
 * Initialize theme toggle button
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });
    
    // Keyboard shortcut: Alt + T for theme toggle
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 't') {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
}

/**
 * Update theme label
 */
function updateThemeLabel() {
    const themeLabel = document.querySelector('.theme-label');
    if (themeLabel) {
        themeLabel.textContent = currentTheme === 'light' ? '☀️ Light' : '🌙 Dark';
    }
}

// ========================================
// LANGUAGE SWITCHING SYSTEM
// ========================================

const languages = {
    en: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
    },
    de: {
        home: 'Startseite',
        about: 'Über mich',
        projects: 'Projekte',
        contact: 'Kontakt',
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyLanguage(lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const langBtn = document.getElementById(`lang-${lang}`);
    if (langBtn) {
        langBtn.classList.add('active');
    }
}

function applyLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    document.documentElement.lang = lang;
}

// ========================================
// HAMBURGER MENU
// ========================================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ========================================
// FORM HANDLER
// ========================================

function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        const mailtoLink = `mailto:gorashe.suliman@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        
        window.location.href = mailtoLink;

        form.reset();
        
        showNotification('Email client opened! Please send the email.', 'success');
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
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
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 998;
            font-size: 1.25rem;
            transition: all 0.3s ease;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `;
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

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
        if (document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👋 Welcome to Gorashe Suliman\'s Portfolio!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%c💡 Tip: Press Alt+T to toggle dark mode!', 'color: #10b981; font-size: 14px;');
console.log('%cGitHub: github.com/qurashi512', 'color: #6b7280;');
console.log('%cEmail: gorashe.suliman@outlook.com', 'color: #6b7280;');
