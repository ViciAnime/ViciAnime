document.addEventListener('DOMContentLoaded', () => {
  // === HEADER SCROLL BEHAVIOR ===
  const header = document.querySelector('header');
  if (header) {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hide-header');
      } else {
        header.classList.remove('hide-header');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  // === HERO SLIDER ===
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');

  if (slides.length > 0 && dotsContainer) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

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

    function startSlider() {
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
      }, 8000);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startSlider();
    }

    showSlide(currentSlide);
    startSlider();
  }

  // === BUSCADOR ===
  const searchInput = document.getElementById('anime-search');
  const resultsBox = document.getElementById('search-results');
  const animes = [
    "Naruto", "One Piece", "Attack on Titan", "Jujutsu Kaisen",
    "Demon Slayer", "Death Note", "Dragon Ball", "Bleach",
    "My Hero Academia", "Tokyo Ghoul", "Chainsaw Man"
  ];

  if (searchInput && resultsBox) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      resultsBox.innerHTML = '';
      
      if (query.length === 0) {
        resultsBox.style.display = 'none';
        return;
      }

      const filtered = animes.filter(anime => 
        anime.toLowerCase().includes(query)
      );

      if (filtered.length > 0) {
        filtered.forEach(anime => {
          const li = document.createElement('li');
          li.textContent = anime;
          li.addEventListener('click', () => {
            searchInput.value = anime;
            resultsBox.style.display = 'none';
          });
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
  }

  // === GENERADOR DINÁMICO DE EPISODIOS ===
  const contenedorEpisodios = document.getElementById('contenedor-episodios');
  const selectBloque = document.getElementById('rango-episodios');

  if (contenedorEpisodios && selectBloque) {
    const totalEpisodios = 1144;
    const episodiosPorBloque = 25;

    function generarEpisodios(bloqueNumero) {
      contenedorEpisodios.innerHTML = '';
      const inicio = (bloqueNumero - 1) * episodiosPorBloque + 1;
      const fin = bloqueNumero === 46 
        ? totalEpisodios 
        : Math.min(bloqueNumero * episodiosPorBloque, totalEpisodios);

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

    // Inicializar primer bloque
    generarEpisodios(1);

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
  if (generos.length > 0) {
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
      const texto = gen.textContent.trim();
      const clave = quitarTildes(texto.toLowerCase());
      if (similares[clave] && animesParaMostrar.length === 0) {
        animesParaMostrar = similares[clave];
      }
    });

    // Renderizar en el contenedor
    const contenedorSimilares = document.querySelector('.similar-animes');
    if (contenedorSimilares && animesParaMostrar.length > 0) {
      // Limpiar contenido existente (excepto el título)
      const titulo = contenedorSimilares.querySelector('h3');
      contenedorSimilares.innerHTML = '';
      if (titulo) contenedorSimilares.appendChild(titulo);

      // Añadir tarjetas
      animesParaMostrar.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
          <a href="${anime.enlace}">
            <img src="assets/imagenes/placeholder.jpg" alt="${anime.nombre}" />
            <div class="anime-info">
              <span class="anime-title">${anime.nombre}</span>
              <span class="anime-meta">2023 - En emisión</span>
            </div>
          </a>
        `;
        contenedorSimilares.appendChild(card);
      });
    }
  }

  // === FUNCIÓN PARA BUSCAR IMAGEN EN JIKAN ===
  async function buscarImagenEnJikan(titulo) {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(titulo)}&limit=1`
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        return data.data[0].images.jpg.image_url;
      }
    } catch (error) {
      console.warn(`⚠️ No se encontró imagen para "${titulo}"`);
    }

    // Imagen por defecto si no se encuentra
    return 'assets/imagenes/placeholder.jpg';
  }

  // === CARGA DINÁMICA DE ANIMES CON PAGINACIÓN (INDEX) ===
  async function cargarAnimes() {
    try {
      console.log('🔍 Intentando cargar animes.json...');
      const response = await fetch('animes.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      console.log('✅ animes.json cargado correctamente');
      const animes = await response.json();
      console.log(`📊 Total de animes: ${animes.length}`);

      const contenedor = document.getElementById('catalogo');
      const pageButtonsContainer = document.getElementById('page-buttons');

      if (!contenedor || !pageButtonsContainer) {
        console.error('❌ No se encontró el contenedor #catalogo o #page-buttons');
        return;
      }

      // Calcular total de páginas
      const totalPages = Math.ceil(animes.length / itemsPerPage);

      // Renderizar animes de la página actual
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, animes.length);
      const animesPagina = animes.slice(startIndex, endIndex);

      contenedor.innerHTML = '';

      // Procesar cada anime con imagen de Jikan
      for (const anime of animesPagina) {
        let imagenUrl = anime.imagen;

        // Si no tiene imagen local o es placeholder, buscar en Jikan
        if (!imagenUrl || imagenUrl.includes('placeholder') || imagenUrl.includes('assets/')) {
          imagenUrl = await buscarImagenEnJikan(anime.titulo);
        }

        const tarjeta = document.createElement('a');
        tarjeta.href = anime.ruta;
        tarjeta.className = 'anime-card-link';

        tarjeta.innerHTML = `
          <div class="anime-card">
            <div style="position: relative;">
              <img src="${imagenUrl}" alt="${anime.titulo}" loading="lazy" />
              ${anime.etiqueta ? `<span class="etiqueta-estreno">${anime.etiqueta}</span>` : ''}
            </div>
            <div class="card-info">
              <h3>${anime.titulo}</h3>
              <div>
                <span class="tipo">${anime.tipo}</span>
                <span class="estado ${anime.estado}">${anime.anio} - ${anime.estadoTexto}</span>
              </div>
            </div>
          </div>
        `;

        contenedor.appendChild(tarjeta);
      }

      // Renderizar botones de paginación
      renderizarPaginacion(totalPages);

    } catch (error) {
      console.error('❌ Error al cargar los animes:', error);
      document.getElementById('catalogo').innerHTML = `
        <p style="color: red; text-align: center;">
          Error al cargar los animes: ${error.message}
        </p>
      `;
    }
  }

  // === CARGA DINÁMICA DE ANIMES CON PAGINACIÓN CORREGIDA ===
let currentPage = 1;
const itemsPerPage = 21; // 3 filas × 7 animes

// === FUNCIÓN PARA BUSCAR IMAGEN EN JIKAN ===
async function buscarImagenEnJikan(titulo) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(titulo)}&limit=1`
    );
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data[0].images.jpg.image_url;
    }
  } catch (error) {
    console.warn(`⚠️ No se encontró imagen para "${titulo}"`);
  }

  // Imagen por defecto si no se encuentra
  return 'assets/imagenes/placeholder.jpg';
}

// === CARGAR CATÁLOGO CORREGIDO ===
async function cargarCatalogo(pagina = 1) {
  try {
    console.log(`🔍 Cargando página ${pagina}...`);
    const response = await fetch('animes.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const animes = await response.json();
    const totalPages = Math.ceil(animes.length / itemsPerPage);

    // Calcular rango de animes para esta página
    const startIndex = (pagina - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, animes.length);
    const animesPagina = animes.slice(startIndex, endIndex);

    // Renderizar animes
    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = '';

    // Procesar cada anime con imagen de Jikan
    for (const anime of animesPagina) {
      let imagenUrl = anime.imagen;

      // Si no tiene imagen local o es placeholder, buscar en Jikan
      if (!imagenUrl || imagenUrl.includes('placeholder') || imagenUrl.includes('assets/')) {
        imagenUrl = await buscarImagenEnJikan(anime.titulo);
      }

      const tarjeta = document.createElement('a');
      tarjeta.href = anime.ruta;
      tarjeta.className = 'anime-card-link';

      tarjeta.innerHTML = `
        <div class="anime-card">
          <div style="position: relative;">
            <img src="${imagenUrl}" alt="${anime.titulo}" loading="lazy" />
            ${anime.etiqueta ? `<span class="etiqueta-estreno">${anime.etiqueta}</span>` : ''}
          </div>
          <div class="card-info">
            <h3>${anime.titulo}</h3>
            <div>
              <span class="tipo">${anime.tipo}</span>
              <span class="estado ${anime.estado}">${anime.anio} - ${anime.estadoTexto}</span>
            </div>
          </div>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    }

    // Actualizar paginación
    renderizarPaginacion(totalPages, pagina);

  } catch (error) {
    console.error('❌ Error al cargar los animes:', error);
    document.getElementById('catalogo').innerHTML = `
      <p style="color: red; text-align: center;">
        Error al cargar los animes: ${error.message}
      </p>
    `;
  }
}

// === RENDERIZAR PAGINACIÓN CORREGIDA ===
function renderizarPaginacion(totalPages, paginaActual) {
  const container = document.getElementById('page-buttons');
  container.innerHTML = '';

  const maxVisiblePages = 7;
  let startPage = Math.max(1, paginaActual - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Botón "‹"
  const prevButton = document.getElementById('prev-page');
  prevButton.disabled = paginaActual === 1;
  prevButton.onclick = () => {
    if (paginaActual > 1) {
      currentPage = paginaActual - 1;
      cargarCatalogo(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Botón "›"
  const nextButton = document.getElementById('next-page');
  nextButton.disabled = paginaActual === totalPages;
  nextButton.onclick = () => {
    if (paginaActual < totalPages) {
      currentPage = paginaActual + 1;
      cargarCatalogo(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Botones de página
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = `page-number ${i === paginaActual ? 'active' : ''}`;
    button.onclick = () => {
      currentPage = i;
      cargarCatalogo(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    container.appendChild(button);
  }

  // Añadir "..." si hay más páginas
  if (startPage > 1) {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    ellipsis.style.margin = '0 0.5rem';
    container.insertBefore(ellipsis, container.firstChild);
  }

  if (endPage < totalPages) {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    ellipsis.style.margin = '0 0.5rem';
    container.appendChild(ellipsis);
  }
}

// Ejecutar solo si estamos en la página de catálogo
if (document.body.classList.contains('pagina-catalogo')) {
  console.log('🚀 Cargando catálogo...');
  cargarCatalogo(currentPage);
}
