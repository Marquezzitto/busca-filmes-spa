// src/js/componentes/paginas/filmes.js
import buscarMidiaAPI from '../services/api.js';

async function filmes(app) {
  app.innerHTML = `
    <section class="pagina container my-5">
      <div class="mb-5">
        <h1 class="title is-2 pagina__titulo">Catálogo de Filmes</h1>
        <p class="pagina__descricao">Acesse os maiores sucessos de bilheteria mundial com trailers reais integrados.</p>
      </div>

      <!-- Caixa de Busca -->
      <div class="field has-addons mb-6" style="max-width: 600px;">
        <div class="control is-expanded">
          <input type="text" id="input-filme" class="input is-medium is-rounded-left" placeholder="Pesquise por filmes (ex: Batman, Harry Potter, Matrix)...">
        </div>
        <div class="control">
          <button id="btn-buscar-filme" class="button is-link is-medium is-rounded-right">
            <span class="icon"><i data-lucide="search"></i></span>
            <span>Buscar</span>
          </button>
        </div>
      </div>

      <div id="lista-filmes" class="columns is-multiline"></div>
    </section>
  `;

  // Inicializa trazendo as maiores tendências de filmes de hoje do TMDB
  executarBusca('');
  ativarBusca();
}

function ativarBusca() {
  const input = document.getElementById('input-filme');
  const btn = document.getElementById('btn-buscar-filme');

  if (input && btn) {
    btn.addEventListener('click', () => executarBusca(input.value));
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') executarBusca(input.value);
    });
  }
}

async function executarBusca(termo) {
  const container = document.getElementById('lista-filmes');
  if (!container) return;

  const busca = termo.trim();

  container.innerHTML = `
    <div class="column is-12 has-text-centered py-6">
      <p class="subtitle"><i data-lucide="loader" class="spinner mr-2"></i>Conectando ao catálogo do TMDB...</p>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Passa 'movie' como segundo parâmetro para buscar estritamente filmes
  const resultados = await buscarMidiaAPI(busca, 'movie');

  if (resultados.length === 0) {
    container.innerHTML = `
      <div class="column is-12 has-text-centered py-6">
        <p class="subtitle">Nenhum filme encontrado para "${busca}". Verifique se configurou a API_KEY em api.js!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = resultados.map(f => `
    <div class="column is-12-mobile is-6-tablet is-4-desktop">
      <!-- Passa f.id e 'movie' para o abrirDetalhes -->
      <div class="card card-clicavel" onclick="abrirDetalhes(${f.id}, 'movie')">
        <div class="card-image">
          <div class="card-image-container">
            <img src="${f.imagem}" alt="${f.titulo}" loading="lazy">
            <div class="card-hover-overlay">
              <span class="icon is-large"><i data-lucide="info" style="width:32px; height:32px; color:#fff;"></i></span>
              <p style="color:#fff; font-weight:bold; margin-top:8px;">Mais Informações</p>
            </div>
          </div>
        </div>
        <div class="card-content">
          <h3 class="title is-5 mb-2">${f.titulo}</h3>
          <p class="subtitle is-6 mb-2"><strong>Lançamento:</strong> ${f.ano}</p>
          <p class="subtitle is-6 mb-2" style="color: #fbbf24; font-weight: bold;">
            <span class="icon mr-1"><i data-lucide="star" style="fill: #fbbf24; color: #fbbf24;"></i></span> ${f.nota}
          </p>
        </div>
      </div>
    </div>
  `).join('');
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

export default {
  url: '#filmes',
  label: 'Filmes',
  pagina: filmes
};