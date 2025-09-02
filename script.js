document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    let currentSlide = 0;
    const slideDuration = 5000;
    const transitionSpeed = 500; // IMPORTANTE: debe coincidir con la duración de la transición en el CSS (0.5s = 500ms)
    let slideInterval;
    let isTransitioning = false; // Bandera para controlar el estado de la animación

    function showSlide(index) {
        // Si ya hay una animación en curso, no hacer nada
        if (isTransitioning) return;
        isTransitioning = true;

        // Encuentra la diapositiva que está activa actualmente
        const currentActiveSlide = document.querySelector('.slide.active');
        if (currentActiveSlide) {
            // Simplemente le quitamos la clase 'active', el CSS se encargará de la animación de desaparición
            currentActiveSlide.classList.remove('active');
        }

        // Hacemos aparecer la nueva diapositiva. El CSS se encargará de la animación
        slides[index].classList.add('active');
        
        // Después de que la animación termine, permitimos nuevos clics
        setTimeout(() => {
            isTransitioning = false;
        }, transitionSpeed);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    // Para la primera carga, mostramos la primera diapositiva sin animación
    slides[0].classList.add('active');
    isTransitioning = false;
    startSlider();
});