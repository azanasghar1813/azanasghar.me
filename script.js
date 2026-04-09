// ==================== INITIALIZE EMAILJS ====================
if (window.emailjs && typeof window.emailjs.init === 'function') {
    window.emailjs.init('2OH0JdoYkJfZbM1tS');
} else {
    console.warn('EmailJS not loaded. Contact form email sending is disabled.');
}

// ==================== DARK MODE / LIGHT MODE TOGGLE ==================== 
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
if (themeToggle) {
    updateThemeIcon(savedTheme);
}

// Theme toggle button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.title = 'Switch to Light Mode';
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.title = 'Switch to Dark Mode';
    }
}

// ==================== SMOOTH SCROLLING & NAVIGATION ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
});

// ==================== CONTACT FORM WITH EMAILJS ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!window.emailjs || typeof window.emailjs.send !== 'function') {
            showNotification('❌ Email service unavailable right now. Please try again later.', 'error');
            return;
        }
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Template parameters for admin email (YOU receive this)
        const adminTemplateParams = {
            to_email: 'azanasghar1813@gmail.com',
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Send email to admin (YOU)
        emailjs.send('service_ub57v02', 'template_mdk76d5', adminTemplateParams)
            .then(function(response) {
                console.log('Admin email sent successfully!', response);
                
                // Send auto-reply to user
                const userTemplateParams = {
                    to_email: email,
                    name: name,
                    subject: subject,
                    message: message
                };
                
                return emailjs.send('service_ub57v02', 'template_s34psqd', userTemplateParams);
            })
            .then(function(response) {
                console.log('Auto-reply sent to user!', response);
                
                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('✅ Message sent successfully! Check your email for confirmation.', 'success');
            })
            .catch(function(error) {
                console.error('Error sending email:', error);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('❌ Failed to send message. Please try again or email directly.', 'error');
            });
    });
}

// ==================== NOTIFICATION SYSTEM ==================== 
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#1ABC9C'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        max-width: 400px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        word-break: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== ACTIVE NAV LINK ==================== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = '#1ABC9C';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== MOBILE MENU TOGGLE ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== LAZY LOADING IMAGES ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== FORM INPUT VALIDATION ==================== 
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value) && this.value !== '') {
                this.style.borderColor = '#E74C3C';
            } else {
                this.style.borderColor = '';
            }
        }
        
        if (this.value.trim() === '') {
            this.style.borderColor = '#E74C3C';
        } else {
            this.style.borderColor = '';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '';
    });
});

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== PARALLAX EFFECT FOR HERO ==================== 
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.scrollY < window.innerHeight) {
        heroImage.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
});

// ==================== CONSOLE WELCOME MESSAGE ==================== 
console.log(
    '%c Welcome to Azan Asghar\'s Portfolio! ',
    'background: #1ABC9C; color: white; padding: 10px; border-radius: 5px; font-weight: bold; font-size: 14px;'
);
console.log('%c Software Developer | Cyber Expert | AI Enthusiast ', 'color: #1ABC9C; font-size: 12px;');
console.log('%c 📧 Contact: azanasghar1813@gmail.com ', 'color: #27AE60; font-size: 11px;');
console.log('%c 🔗 GitHub: https://github.com/azanasghar1813 ', 'color: #27AE60; font-size: 11px;');
console.log('%c 🌐 Portfolio: https://azanasghar.me ', 'color: #27AE60; font-size: 11px;');

// ==================== PAGE LOAD OPTIMIZATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial opacity
document.body.style.opacity = '0.95';
document.body.style.transition = 'opacity 0.5s ease';

// ==================== SERVICE WORKER REGISTRATION (Optional) ==================== 
if ('serviceWorker' in navigator) {
    // Uncomment if you want to add PWA support
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// ==================== DETECT REDUCED MOTION PREFERENCE ==================== 
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });
}

// ==================== RESPONSIVE NAVBAR ON RESIZE ==================== 
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== CUSTOM SCROLLBAR (Optional) ==================== 
const style = document.createElement('style');
style.textContent = `
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-light);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--primary-dark);
    }
`;
document.head.appendChild(style);

// ==================== COPY EMAIL TO CLIPBOARD ==================== 
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('contextmenu', (e) => {
        const email = link.textContent;
        if (navigator.clipboard) {
            e.preventDefault();
            navigator.clipboard.writeText(email).then(() => {
                showNotification('✅ Email copied to clipboard!', 'success');
            });
        }
    });
});

// ==================== ANALYTICS TRACKING (Optional) ==================== 
// Uncomment if you want to add Google Analytics or similar
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
*/

// ==================== PERFORMANCE MONITORING ==================== 
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// ==================== ACCESSIBILITY IMPROVEMENTS ==================== 
// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==================== PREVENT ZOOM ON DOUBLE TAP (Mobile) ==================== 
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ==================== ADD ANIMATIONS CSS ==================== 
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(animationStyles);

// ==================== DETECT NETWORK STATUS ==================== 
window.addEventListener('online', () => {
    showNotification('✅ You are back online!', 'success');
});

window.addEventListener('offline', () => {
    showNotification('⚠️ You are offline. Messages will be sent when you reconnect.', 'info');
});

// ==================== SMOOTH HASH NAVIGATION ==================== 
if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// ==================== FORM RESET HANDLING ==================== 
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('reset', function() {
        this.querySelectorAll('input, textarea').forEach(field => {
            field.style.borderColor = '';
        });
    });
});

// ==================== ADD LOADING STATE TO LINKS ==================== 
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function() {
        showNotification('📥 Starting download...', 'info');
    });
});