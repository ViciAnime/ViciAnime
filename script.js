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

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

document.getElementById('next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
});

document.getElementById('prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
});

// Auto-rotación cada 8 segundos
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}, 8000);

// Mostrar el primer slide al cargar
showSlide(currentSlide);
