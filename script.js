// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ===== Navbar Scroll Effect =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and timeline items
document.querySelectorAll('.value-card, .timeline-item, .rep-card, .doc-card, .news-card').forEach(el => {
    observer.observe(el);
});

// ===== Timeline Animation =====
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.timeline-content').forEach(content => {
    content.style.opacity = '0';
    content.style.transform = 'translateY(30px)';
    content.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(content);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Prosím vyplňte všechna pole formuláře.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Prosím zadejte platnou e-mailovou adresu.');
            return;
        }

        // Show success message
        alert('Děkujeme za vaši zprávu! Budeme vás kontaktovat co nejdříve.\n\nPoznámka: Toto je demo formulář. Pro ostrý provoz připojte backend nebo službu pro odesílání e-mailů.');

        // Reset form
        contactForm.reset();

        // In production, you would send this to a server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
    });
}

// ===== Parallax Effect on Hero Section =====
const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');

        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // For placeholder images, you can add data-src attribute
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Add Hover Sound Effect (Optional) =====
// Uncomment if you want to add subtle interaction feedback
/*
const buttons = document.querySelectorAll('.btn, .nav-link');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});
*/

// ===== Counter Animation for Statistics (if needed in future) =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ===== Scroll Progress Indicator =====
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // You can add a progress bar element and update it here
    // document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===== Mobile Menu Styles =====
if (window.innerWidth <= 968) {
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(255, 247, 214, 0.98);
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            gap: 15px;
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Print Page Title on Load (for debugging) =====
console.log('KDU-ČSL Website loaded successfully!');
console.log('Vytvořeno s láskou a péčí o detail');

// ===== Easter Egg - Keyboard Shortcut =====
document.addEventListener('keydown', (e) => {
    // Press 'K' + 'D' + 'U' for a surprise
    const keysPressed = [];

    if (e.key.toLowerCase() === 'k') keysPressed.push('k');
    if (e.key.toLowerCase() === 'd' && keysPressed.includes('k')) keysPressed.push('d');
    if (e.key.toLowerCase() === 'u' && keysPressed.includes('d')) {
        console.log('🎉 Objevili jste easter egg! KDU-ČSL - tradice od roku 1919!');
    }
});
