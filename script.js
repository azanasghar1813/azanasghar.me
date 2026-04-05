// ==================== INITIALIZE EMAILJS ==================== 
emailjs.init('2OH0JdoYkJfZbM1tS');

// ==================== SMOOTH SCROLLING & NAVIGATION ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
});

// ==================== CONTACT FORM WITH EMAILJS ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
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

if (hamburger) {
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
}

// ==================== CONSOLE WELCOME MESSAGE ==================== 
console.log(
    '%c Welcome to Azan Asghar\'s Portfolio! ',
    'background: #1ABC9C; color: white; padding: 10px; border-radius: 5px; font-weight: bold; font-size: 14px;'
);
console.log('%c Software Developer | Cyber Expert | AI Enthusiast ', 'color: #1ABC9C; font-size: 12px;');
console.log('%c 📧 Contact: azanasghar1813@gmail.com ', 'color: #27AE60; font-size: 11px;');
console.log('%c 🔗 GitHub: https://github.com/azanasghar1813 ', 'color: #27AE60; font-size: 11px;');

// ==================== PAGE LOAD ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0.95';
document.body.style.transition = 'opacity 0.5s ease';