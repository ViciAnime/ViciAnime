document.addEventListener('DOMContentLoaded', () => {
  // === HEADER SCROLL BEHAVIOR ===
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.classList.add('hide-header');
    } else {
      header.classList.remove('hide-header');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // === HERO SLIDER ===
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');
  
  if (slides.length === 0 || !dotsContainer) return; // salir si no hay slider

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Limpiar contenedor (por si se llama dos veces)
  dotsContainer.innerHTML = '';

  // Crear puntitos
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

  let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }, 8000);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }, 8000);
  }

  showSlide(currentSlide);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // ... tu código de header y buscador ...

  // Iniciar el slider
  initSlider();
});
  
  // === BUSCADOR ===
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
});
  // === GENERADOR DINÁMICO DE EPISODIOS ===
const totalEpisodios = 1144;
const episodiosPorBloque = 25;
const contenedorEpisodios = document.getElementById('contenedor-episodios');
const selectBloque = document.getElementById('rango-episodios');

if (contenedorEpisodios && selectBloque) {
  function generarEpisodios(bloqueNumero) {
    contenedorEpisodios.innerHTML = '';
    const inicio = (bloqueNumero - 1) * episodiosPorBloque + 1;
    const fin = bloqueNumero === 46 ? totalEpisodios : Math.min(bloqueNumero * episodiosPorBloque, totalEpisodios);

    for (let i = inicio; i <= fin; i++) {
      const episodio = document.createElement('div');
      episodio.className = 'episodio';
      episodio.innerHTML = `
        <a href="episodios/episodio${i}.html">
          <img src="../../assets/imagenes/onepiececaps.webp" alt="Episodio ${i}">
          <span class="episodio-texto">Episodio ${i}</span>
        </a>
      `;
      contenedorEpisodios.appendChild(episodio);
    }
  }

  // Cargar primer bloque al iniciar
  generarEpisodios(1);

  // Cambiar al seleccionar
  selectBloque.addEventListener('change', (e) => {
    const bloque = parseInt(e.target.value);
    generarEpisodios(bloque);
  });
}

  // === ANIMES SIMILARES ===
  function quitarTildes(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const generos = document.querySelectorAll('.anime-genres a');
  const similares = {
    accion: [
      { nombre: 'Naruto', enlace: 'naruto.html' },
      { nombre: 'Bleach', enlace: 'bleach.html' },
      { nombre: 'Attack on Titan', enlace: 'aot.html' }
    ],
    aventura: [
      { nombre: 'Fairy Tail', enlace: 'fairytail.html' },
      { nombre: 'Hunter x Hunter', enlace: 'hunterxhunter.html' },
      { nombre: 'Made in Abyss', enlace: 'abyss.html' }
    ],
    fantasia: [
      { nombre: 'Black Clover', enlace: 'blackclover.html' },
      { nombre: 'Magi', enlace: 'magi.html' },
      { nombre: 'Re:Zero', enlace: 'rezero.html' }
    ],
    comedia: [
      { nombre: 'Gintama', enlace: 'gintama.html' },
      { nombre: 'KonoSuba', enlace: 'konosuba.html' },
      { nombre: 'Saiki K.', enlace: 'saikik.html' }
    ]
  };

  // Buscar primer género coincidente
  let animesParaMostrar = [];
  generos.forEach(gen => {
    const clave = quitarTildes(gen.textContent.trim().toLowerCase());
    if (similares[clave]) {
      animesParaMostrar = similares[clave];
      return;
    }
  });

  // Si quieres mostrar más de un género, puedes modificar esta lógica
});
