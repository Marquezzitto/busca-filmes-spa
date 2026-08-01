import { rotas } from './components/rotas/rotas.js';
import { renderNavbar } from './components/navbar/navbar.js';
import { renderFooter } from './components/footer/footer.js';
import { NaoEncontrado } from './components/paginas/naoEncontrado.js';

function roteador() {
  const appContainer = document.getElementById('app');
  let hash = window.location.hash || '#home';

  // Busca a rota correspondente
  const rotaAtual = rotas.find(r => r.url === hash);

  if (rotaAtual) {
    appContainer.innerHTML = rotaAtual.pagina();
    if (typeof rotaAtual.acao === 'function') {
      rotaAtual.acao();
    }
  } else {
    appContainer.innerHTML = NaoEncontrado();
  }
}

// Inicializa os componentes e a rota
window.addEventListener('DOMContentLoaded', () => {
  renderNavbar(rotas);
  renderFooter();
  roteador();
});

// Escuta as alterações na hash da URL
window.addEventListener('hashchange', roteador);
