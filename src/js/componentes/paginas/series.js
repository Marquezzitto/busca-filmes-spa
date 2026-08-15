// src/js/componentes/paginas/series.js
import buscarMidiaAPI from '../services/api.js';

async function series(app) {
  app.innerHTML = `
    <section class="pagina container my-5">
      <div class="mb-5">
        <h1 class="title is-2 pagina__titulo">Catálogo de Séries</h1>
        <p class="pagina__descricao">Descubra as séries, animes e produções de TV mais assistidas no mundo.</p>
      </div>

      <div class="field has-addons mb-6" style="max-width: 600px;">
        <div class="control is-expanded">
          <input type="text" id="input-serie" class="input is-medium is-rounded-left" placeholder="Pesquise por séries (ex: Breaking Bad, Stranger Things, Dark)...">
        </div>
        <div class="control">
          <button id="btn-buscar-serie" class="button is-link is-medium is-rounded-right">
            <span class="icon"><i data-lucide="search"></i></span>
            <span>Buscar</span>
          </button>
        </div>
      </div>

      <div id="lista-series" class="columns is-multiline"></div>
    </section>
  `;

  // Inicializa trazendo as maiores tendências de séries de hoje do TMDB
  executarBusca('');
  ativarBusca();
}

function ativarBusca() {
  const input = document.getElementById('input-serie');
  const btn = document.getElementById('btn-buscar-serie');

  if (input && btn) {
    btn.addEventListener('click', () => executarBusca(input.value));
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') executarBusca(input.value);
    });
  }
}

async function executarBusca(termo) {
  const container = document.getElementById('lista-series');
  if (!container) return;

  const busca = termo.trim();

  container.innerHTML = `
    <div class="column is-12 has-text-centered py-6">
      <p class="subtitle"><i data-lucide="loader" class="spinner mr-2"></i>Conectando ao catálogo de TV...</p>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Passa 'tv' como segundo parâmetro para buscar estritamente seriados de TV
  const resultados = await buscarMidiaAPI(busca, 'tv');

  if (resultados.length === 0) {
    container.innerHTML = `
      <div class="column is-12 has-text-centered py-6">
        <p class="subtitle">Nenhuma série encontrada para "${busca}". Verifique se configurou a API_KEY em api.js!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = resultados.map(s => `
    <div class="column is-12-mobile is-6-tablet is-4-desktop">
      <!-- Passa s.id e 'tv' para o abrirDetalhes -->
      <div class="card card-clicavel" onclick="abrirDetalhes(${s.id}, 'tv')">
        <div class="card-image">
          <div class="card-image-container">
            <img src="${s.imagem}" alt="${s.titulo}" loading="lazy">
            <div class="card-hover-overlay">
              <span class="icon is-large"><i data-lucide="info" style="width:32px; height:32px; color:#fff;"></i></span>
              <p style="color:#fff; font-weight:bold; margin-top:8px;">Mais Informações</p>
            </div>
          </div>
        </div>
        <div class="card-content">
          <h3 class="title is-5 mb-2">${s.titulo}</h3>
          <p class="subtitle is-6 mb-2"><strong>Estreia:</strong> ${s.ano}</p>
          <p class="subtitle is-6 mb-2" style="color: #fbbf24; font-weight: bold;">
            <span class="icon mr-1"><i data-lucide="star" style="fill: #fbbf24; color: #fbbf24;"></i></span> ${s.nota}
          </p>
        </div>
      </div>
    </div>
  `).join('');
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

export default {
  url: '#series',
  label: 'Séries',
  pagina: series
};
