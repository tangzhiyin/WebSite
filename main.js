const menuOpen = document.getElementById('mobile-menu-open');
const menuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.getElementById('mobile-menu-overlay');

const toggleMenu = () => {
    menuOverlay.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
};

menuOpen.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);

// Close menu when clicking a link
menuOverlay.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});


// Transparent to solid nav on scroll
const header = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-on-background');
        header.classList.remove('border-transparent');
    } else {
        header.classList.remove('bg-on-background');
        header.classList.add('border-transparent');
    }
});

// Intersection Observer for scroll reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// Custom cursor logic for "designer touch"
const cursor = document.createElement('div');
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.border = '2px solid #0041c8';
cursor.style.borderRadius = '50%';
cursor.style.position = 'fixed';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transition = 'transform 0.1s ease';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(0, 65, 200, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// Micro-interaction for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple scroll animation for the marquee
const scrollEl = document.querySelector('.animate-scroll');
if (scrollEl) {
    let offset = 0;
    function step() {
        offset -= 1;
        if (offset < -500) offset = 0;
        scrollEl.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}