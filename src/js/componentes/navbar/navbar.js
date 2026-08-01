export function renderNavbar(rotas) {
  const containerNav = document.getElementById('navbar');
  if (!containerNav) return;

  const linksHTML = rotas
    .map(rota => `<li class="navbar__item"><a href="${rota.url}" class="navbar__link">${rota.label}</a></li>`)
    .join('');

  containerNav.innerHTML = `
    <nav class="navbar">
      <div class="navbar__logo">🎬 BuscaFilmes SPA</div>
      <ul class="navbar__list">
        ${linksHTML}
      </ul>
    </nav>
  `;
}