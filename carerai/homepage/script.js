// AOS animasiyalarını inicializasiya edirik
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Dashboard-a keçid düyməsi
document.querySelector('.cta-button').addEventListener('click', function() {
    window.location.href = '../dashboard/index.html';
});

// Scroll zamanı naviqasiya panelinin görünüşünü dəyişirik
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Smooth scroll funksionallığı
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 