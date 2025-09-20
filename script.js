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
