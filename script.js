// ==================== INITIALIZE EMAILJS ====================
if (window.emailjs && typeof window.emailjs.init === 'function') {
    window.emailjs.init('2OH0JdoYkJfZbM1tS');
} else {
    console.warn('EmailJS not loaded. Contact form email sending is disabled.');
}

// ==================== THEME TOGGLE REMOVED ====================
// The site now uses a unified glassmorphism UI.

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

// ==================== SCROLL ANIMATIONS (AOS) ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Add AOS attributes dynamically to avoid cluttered HTML
    document.querySelectorAll('.hero-text').forEach(el => el.setAttribute('data-aos', 'fade-right'));
    document.querySelectorAll('.hero-visual').forEach(el => el.setAttribute('data-aos', 'fade-left'));
    document.querySelectorAll('.section-title').forEach(el => el.setAttribute('data-aos', 'fade-up'));
    document.querySelectorAll('.about-text').forEach(el => el.setAttribute('data-aos', 'fade-right'));
    document.querySelectorAll('.about-stats').forEach(el => el.setAttribute('data-aos', 'fade-left'));
    document.querySelectorAll('.career-objective').forEach(el => el.setAttribute('data-aos', 'zoom-in'));
    
    document.querySelectorAll('.skill-category').forEach((el, index) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', (index % 4) * 100);
    });
    
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', (index % 3) * 100);
    });

    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.setAttribute('data-aos', 'fade-right');
        el.setAttribute('data-aos-delay', index * 100);
    });

    document.querySelectorAll('.stat-card').forEach((el, index) => {
        el.setAttribute('data-aos', 'zoom-in');
        el.setAttribute('data-aos-delay', index * 100);
    });

    document.querySelectorAll('.achievements, .learning-goals').forEach(el => el.setAttribute('data-aos', 'fade-left'));
    document.querySelectorAll('.degree-card, .coursework, .future-goals').forEach(el => el.setAttribute('data-aos', 'fade-right'));
    document.querySelectorAll('.contact-info-section').forEach(el => el.setAttribute('data-aos', 'fade-right'));
    document.querySelectorAll('.contact-form').forEach(el => el.setAttribute('data-aos', 'fade-left'));

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Initialize Typed.js for Hero Section
    if (document.querySelector('.typed-role')) {
        new Typed('.typed-role', {
            strings: [
                'Software Developer',
                'Cyber Enthusiast',
                'Full-Stack Engineer',
                'AI Innovator'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
});

// ==================== ACTIVE NAV LINK & NAVBAR SCROLL ==================== 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

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

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    }
});

document.querySelectorAll('a, button, .project-card, .skill-item, .contact-item, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if(cursorOutline) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if(cursorOutline) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        }
    });
});

// ==================== TSPARTICLES (CYBER NETWORK) ====================
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "grab" },
                resize: true
            },
            modes: {
                push: { quantity: 4 },
                grab: { distance: 140, links: { opacity: 1 } }
            }
        },
        particles: {
            color: { value: "#F97316" },
            links: {
                color: "#FFB382",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
    });
}

// ==================== HACKER TERMINAL ====================
const terminalOverlay = document.getElementById('terminalOverlay');
const openTerminalBtn = document.getElementById('openTerminal');
const closeTerminalBtn = document.getElementById('closeTerminal');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

if (terminalOverlay && openTerminalBtn) {
    openTerminalBtn.addEventListener('click', () => {
        terminalOverlay.classList.add('active');
        setTimeout(() => terminalInput.focus(), 300);
    });

    closeTerminalBtn.addEventListener('click', () => {
        terminalOverlay.classList.remove('active');
    });

    terminalOverlay.addEventListener('click', (e) => {
        if (e.target === terminalOverlay) {
            terminalOverlay.classList.remove('active');
        }
    });
    
    // Always focus input when clicking inside terminal
    const terminalWindow = document.querySelector('.terminal-window');
    if(terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    if(terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                if (command) {
                    processCommand(command);
                }
                this.value = '';
            }
        });
    }

    function processCommand(cmd) {
        // Echo command
        const cmdLine = document.createElement('p');
        cmdLine.innerHTML = `<span class="prompt">azan@portfolio:~$</span> ${cmd}`;
        terminalOutput.appendChild(cmdLine);

        // Process output
        const outputLine = document.createElement('p');
        
        switch(cmd) {
            case 'help':
                outputLine.innerHTML = "Available commands:<br>- <span class='highlight-text'>whoami</span>: Learn about Azan<br>- <span class='highlight-text'>skills</span>: List technical skills<br>- <span class='highlight-text'>clear</span>: Clear terminal<br>- <span class='highlight-text'>sudo hire azan</span>: Execute hiring protocol";
                break;
            case 'whoami':
                outputLine.innerHTML = "Azan Asghar. Software Developer. Cyber Enthusiast. Based in Lahore. Currently building the future at ITU.";
                break;
            case 'skills':
                outputLine.innerHTML = "Initializing skill scan... [OK]<br>Languages: Python, C++, SQL, Dart, JS<br>Tools: React, Node.js, Flutter, Kali Linux<br>Status: Highly capable.";
                break;
            case 'sudo hire azan':
                outputLine.innerHTML = "<span style='color: #ffbd2e;'>[!] INITIALIZING HIGHEST PRIVILEGE HIRING PROTOCOL...</span><br>Bypassing standard HR filters... [SUCCESS]<br>Deploying Azan to your engineering team... [SUCCESS]<br><br>Please contact azanasghar1813@gmail.com to finalize access.";
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                return;
            default:
                outputLine.innerHTML = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }
        
        terminalOutput.appendChild(outputLine);
        
        // Auto scroll to bottom
        const terminalBody = document.getElementById('terminalBody');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

// ==================== ADD LOADING STATE TO LINKS ==================== 
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function() {
        showNotification('📥 Starting download...', 'info');
    });
});