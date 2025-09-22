document.addEventListener('DOMContentLoaded', () => {
    // === HEADER SCROLL BEHAVIOR ===
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll hacia abajo
      header.classList.add('hide-header');
    } else {
      // Scroll hacia arriba o al principio
      header.classList.remove('hide-header');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
  // Carrusel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const dotsContainer = document.getElementById('sliderDots');

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
  }, 12000);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }, 12000);
  }

  showSlide(currentSlide);

  // Buscador
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






document.addEventListener('DOMContentLoaded', () => {
  const generoPrincipal = document.querySelector('.anime-genres a')?.textContent?.toLowerCase();

  const similares = {
    acción: [
      { nombre: 'Naruto', enlace: 'naruto.html' },
      { nombre: 'Bleach', enlace: 'bleach.html' },
      { nombre: 'Attack on Titan', enlace: 'aot.html' }
    ],
    aventura: [
      { nombre: 'Fairy Tail', enlace: 'fairytail.html' },
      { nombre: 'Hunter x Hunter', enlace: 'hunterxhunter.html' },
      { nombre: 'Made in Abyss', enlace: 'abyss.html' }
    ],
    fantasía: [
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

  const contenedor = document.querySelector('.animes-similares ul');
  if (contenedor && similares[generoPrincipal]) {
    contenedor.innerHTML = '';
    similares[generoPrincipal].forEach(anime => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = anime.enlace;
      a.textContent = anime.nombre;
      li.appendChild(a);
      contenedor.appendChild(li);
    });
  }
});

<script>
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('rango-episodios');
  const lista = document.getElementById('lista-episodios');

  selector.addEventListener('change', () => {
    const [inicio, fin] = selector.value.split('-').map(Number);
    lista.innerHTML = ''; // limpiar lista anterior

    for (let i = inicio; i <= fin; i++) {
      const episodio = document.createElement('div');
      episodio.className = 'episodio';
      episodio.textContent = `Episodio ${i}`;
      lista.appendChild(episodio);
    }
  });
});
</script>


<script>
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('rango-episodios');
  const lista = document.getElementById('lista-episodios');

  function mostrarEpisodios(inicio, fin) {
    lista.innerHTML = '';
    for (let i = inicio; i <= fin; i++) {
      const episodio = document.createElement('div');
      episodio.className = 'episodio';
      episodio.textContent = `Episodio ${i}`;
      lista.appendChild(episodio);
    }
  }

  // Mostrar del 1 al 25 al cargar
  mostrarEpisodios(1, 25);

  // Actualizar al cambiar el selector
  selector.addEventListener('change', () => {
    const [inicio, fin] = selector.value.split('-').map(Number);
    mostrarEpisodios(inicio, fin);
  });
});
</script>
