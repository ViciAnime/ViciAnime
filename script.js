function filtrarAnime() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".anime-card").forEach(card => {
    const titulo = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = titulo.includes(input) ? "block" : "none";
  });
}

function filtrarEstado(estado) {
  document.querySelectorAll(".filtros button").forEach(btn => btn.classList.remove("activo"));
  event.target.classList.add("activo");

  document.querySelectorAll(".anime-card").forEach(card => {
    if (estado === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.dataset.status === estado ? "block" : "none";
    }
  });
}
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

// Auto-rotación más lenta (12 segundos)
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
