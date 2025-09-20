<script>
document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const dotsContainer = document.getElementById('sliderDots');

  // Crear los puntitos dinámicamente
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = i;
      showSlide(currentSlide);
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Auto-rotación cada 12 segundos
  let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }, 12000);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }, 12000);
  }

  // Mostrar el primer slide al cargar
  showSlide(currentSlide);
});
</script>

