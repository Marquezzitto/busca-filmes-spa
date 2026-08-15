// src/js/componentes/navbar/navbar.js

export function navbar(item_menu) {
  const container = document.getElementById('navbar');
  if (!container) return;

  const linksHTML = item_menu
    .map(item => {
      let icone = 'layers';
      if (item.label === 'Home') icone = 'home';
      if (item.label === 'Filmes') icone = 'film';
      if (item.label === 'Séries') icone = 'tv';
      if (item.label === 'Contato') icone = 'mail';

      return `
        <a href="${item.url}" class="navbar-item px-3" style="font-weight: 600;">
          <span class="icon mr-1"><i data-lucide="${icone}"></i></span>
          ${item.label}
        </a>
      `;
    })
    .join('');

  container.innerHTML = `
    <nav class="navbar is-transparent" style="box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
      <div class="container">
        <div class="navbar-brand">
          <!-- 🌟 MARCA DINÂMICA: Agora usa classe CSS para mudar de cor com o tema -->
          <a class="navbar-item navbar-brand-logo" href="#home">
            <span class="icon mr-2 brand-icon"><i data-lucide="clapperboard"></i></span>
            PrimeCine
          </a>
        </div>
        <div class="navbar-menu is-active">
          <div class="navbar-end d-flex align-items-center">
            ${linksHTML}
            
            <!-- Botão de Troca de Tema -->
            <div class="navbar-item">
              <button onclick="window.alternarTemaGlobal()" class="theme-toggle-btn" aria-label="Mudar Tema">
                <i data-lucide="sun" class="sun-icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `;
}

export default navbar;