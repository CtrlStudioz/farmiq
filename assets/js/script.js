
// mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.right = '20px';
        nav.style.background = 'white';
        nav.style.padding = '20px';
        nav.style.borderRadius = '5px';
        nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
});

// scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            const nav = document.querySelector('nav ul');
            if(window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        }
    });
});

// scroll to top
document.getElementById('logo-link').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Back to top button 
const backToTopButton = document.getElementById('backToTop');

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when back to top button is clicked
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Swiper animation
document.addEventListener('DOMContentLoaded', function() {
    const swiperTrack = document.getElementById('swiper-track');
    const cards = document.querySelectorAll('.team-member-card');
    
    function updateAnimation() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 30;
        const totalWidth = (cardWidth + gap) * 5; 
        
        const style = document.createElement('style');
        style.id = 'swiper-animation';
        
        const existingStyle = document.getElementById('swiper-animation');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        style.textContent = `
            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${totalWidth}px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    updateAnimation();
    
    window.addEventListener('resize', updateAnimation);
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    swiperTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        swiperTrack.style.animationPlayState = 'paused';
    });
    
    swiperTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        swiperTrack.style.transform = `translateX(calc(-${(cards[0].offsetWidth + 30) * 5}px + ${diff}px))`;
    });
    
    swiperTrack.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        swiperTrack.style.animationPlayState = 'running';
        swiperTrack.style.transform = '';
    });
});


