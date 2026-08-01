export function navbar(item_menu) {
  const container = document.getElementById('navbar');
  if (!container) return;

  const linksHTML = item_menu
    .map(item => `
      <li class="bem-navbar__item">
        <a href="${item.url}" class="bem-navbar__link">${item.label}</a>
      </li>
    `)
    .join('');

  container.innerHTML = `
    <nav class="bem-navbar">
      <div class="bem-navbar__brand">🎬 BuscaFilmes SPA</div>
      <ul class="bem-navbar__menu">
        ${linksHTML}
      </ul>
    </nav>
  `;
}

export default navbar;