let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dotsContainer = document.getElementById('sliderDots');

// Crear los puntitos
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    currentSlide = i;
    showSlide(currentSlide);
    resetInterval();
  });
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });

  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) dot.classList.add('active');
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

<script>
  const searchInput = document.getElementById('anime-search');
  const resultsBox = document.getElementById('search-results');

  const animes = [
    "Naruto", "One Piece", "Attack on Titan", "Jujutsu Kaisen",
    "Demon Slayer", "Death Note", "Dragon Ball", "Bleach",
    "My Hero Academia", "Tokyo Ghoul", "Chainsaw Man"
  ];

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    resultsBox.innerHTML = '';

    if (query.length === 0) {
      resultsBox.style.display = 'none';
      return;
    }

    const filtered = animes.filter(anime => anime.toLowerCase().includes(query));

    if (filtered.length > 0) {
      filtered.forEach(anime => {
        const li = document.createElement('li');
        li.textContent = anime;
        resultsBox.appendChild(li);
      });
      resultsBox.style.display = 'block';
    } else {
      resultsBox.style.display = 'none';
    }
  });

  searchInput.addEventListener('blur', () => {
    setTimeout(() => resultsBox.style.display = 'none', 200);
  });
</script>

