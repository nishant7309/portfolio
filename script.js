/* =============================================
   NISHANT BHARGAVA PORTFOLIO - JavaScript
   Animations, Scroll Effects, Mobile Menu
   ============================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
    initMobileMenu();
    initSkillBars();
    initTypingEffect();
});

/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add background when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* =============================================
   SCROLL REVEAL ANIMATIONS
   ============================================= */
function initScrollReveal() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.section-header, .glass-card, .timeline-item, .skill-category'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* =============================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================= */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileToggle = document.querySelector('.mobile-toggle');
                navLinksContainer.classList.remove('active');
                mobileToggle.classList.remove('active');

                // Smooth scroll to target
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: targetId === '#hero' ? 0 : offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =============================================
   MOBILE MENU TOGGLE
   ============================================= */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

/* =============================================
   SKILL BARS ANIMATION
   ============================================= */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the skill bar
                const progress = entry.target.style.getPropertyValue('--progress');
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = progress;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/* =============================================
   TYPING EFFECT FOR SUBTITLE
   ============================================= */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    const roles = [
        'AI Researcher',
        'Published @ NeurIPS 2025 & EMNLP 2025',
        'Computer Engineering @ Purdue'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentRole = roles[roleIndex];

        if (isPaused) {
            setTimeout(type, 2000);
            isPaused = false;
            isDeleting = true;
            return;
        }

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            setTimeout(type, 30);
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isPaused = true;
            }

            setTimeout(type, 80);
        }
    }

    // Start typing after initial animation
    setTimeout(() => {
        typingElement.textContent = '';
        type();
    }, 1500);
}

/* =============================================
   PARALLAX EFFECT FOR ORBS
   ============================================= */
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

/* =============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================= */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* =============================================
   CONSOLE GREETING
   ============================================= */
console.log(`
%c👋 Hello there, curious developer!

%cWelcome to Nishant Bhargava's Portfolio.
If you're interested in AI Safety, Interpretability, or just want to chat,
feel free to reach out!

🔗 arXiv: https://arxiv.org/abs/2509.00591
`,
    'font-size: 20px; font-weight: bold;',
    'font-size: 14px; color: #7c3aed;'
);
