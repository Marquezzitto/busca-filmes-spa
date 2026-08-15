// src/js/componentes/paginas/series.js
import { buscarMidiaAPI, obterPorGenero } from '../services/api.js';

// 🌟 LISTA DE ABSOLUTAMENTE TODOS OS GÊNEROS OFICIAIS DE SÉRIES DO TMDB
const TODOS_GENEROS_SERIES = [
  { id: 'destaque', nome: 'Séries em Destaque' },
  { id: 10759, nome: 'Ação e Aventura' },
  { id: 16, nome: 'Animação' },
  { id: 35, nome: 'Comédia' },
  { id: 80, nome: 'Crime' },
  { id: 99, nome: 'Documentário' },
  { id: 18, nome: 'Drama' },
  { id: 10751, nome: 'Família' },
  { id: 10762, nome: 'Kids' },
  { id: 9648, nome: 'Mistério' },
  { id: 10763, nome: 'Notícias' },
  { id: 10764, nome: 'Reality' },
  { id: 10765, nome: 'Ficção Científica e Fantasia' },
  { id: 10766, nome: 'Soap (Novelas)' },
  { id: 10767, nome: 'Talk Show' },
  { id: 10768, nome: 'Guerra e Política' },
  { id: 37, nome: 'Faroeste' }
];

// Monitora de forma independente qual página da API está carregada em cada gênero de série
const paginasPorGeneroSeries = {};

async function series(app) {
  // Inicializa o controle de páginas para cada gênero de série
  TODOS_GENEROS_SERIES.forEach(g => {
    paginasPorGeneroSeries[g.id] = 1;
  });

  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Séries</h1>
      <p class="pagina__descricao">Descubra novos animes, mistérios, dramas e reality shows do mundo.</p>
      
      <!-- Caixa de Busca (Pesquisa em todo o catálogo ao digitar) -->
      <div class="busca-box mb-6">
        <input type="text" id="input-serie" class="input" placeholder="Digite o nome da série para buscar...">
        <button id="btn-buscar-serie" class="btn">Buscar</button>
      </div>

      <!-- Container das Seções de Gêneros de Séries -->
      <div id="secoes-series-container" class="secoes-verticais-container">
        <!-- Estruturas de gêneros serão injetadas aqui -->
      </div>
    </section>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Carrega todas as seções de séries verticalmente
  carregarSecoesSeries();
  
  // Ativa a busca por digitação escrita
  ativarBuscaEscritaSeries();
}

async function carregarSecoesSeries() {
  const container = document.getElementById('secoes-series-container');
  if (!container) return;

  // 1. Cria o esqueleto visual das seções para todos os gêneros
  container.innerHTML = TODOS_GENEROS_SERIES.map(g => `
    <div class="genero-secao mb-6" id="secao-serie-${g.id}">
      <h2 class="title is-4 mb-4 has-text-white" style="font-weight: 800; border-left: 4px solid #E50914; padding-left: 10px;">
        ${g.nome}
      </h2>
      <div id="grid-serie-${g.id}" class="bem-grid-auto">
        <p class="has-text-grey">Carregando catálogo...</p>
      </div>
      <div class="has-text-centered mt-4">
        <button class="button is-danger is-outlined btn-ver-mais-serie" data-id="${g.id}">
          Ver Mais ${g.nome}
        </button>
      </div>
    </div>
  `).join('');

  // 2. Preenche cada seção de série com dados da API (Página 1)
  TODOS_GENEROS_SERIES.forEach(async (g) => {
    let resultados = [];
    if (g.id === 'destaque') {
      resultados = await buscarMidiaAPI('', 'tv', 1);
    } else {
      resultados = await obterPorGenero('tv', g.id, 1);
    }
    renderizarSeriesNoGrid(g.id, resultados, false);
  });

  // 3. Ativa o clique dos botões "Ver Mais"
  ativarBotoesVerMaisSeries();
}

function renderizarSeriesNoGrid(generoId, listaSeries, append = false) {
  const grid = document.getElementById(`grid-serie-${generoId}`);
  if (!grid) return;

  if (!append && listaSeries.length === 0) {
    grid.innerHTML = '<p class="has-text-grey">Nenhum título encontrado nesta categoria no momento.</p>';
    return;
  }

  const htmlCards = listaSeries.map(s => `
    <div class="card card-clicavel bem-card animate-pop" onclick="abrirDetalhes(${s.id}, 'tv')">
      <div class="card-image-container">
        <img src="${s.imagem}" alt="${s.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295?text=Sem+Capa'">
        <div class="card-hover-overlay">
          <button class="button is-danger is-rounded font-weight-bold">Ver Detalhes</button>
        </div>
      </div>
      <div class="card-content py-4 px-3">
        <h3 class="title is-6 has-text-white mb-2" style="font-weight: 700; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
          ${s.titulo}
        </h3>
        <div class="d-flex align-items-center justify-content-between" style="font-size: 0.85rem;">
          <span style="color: #fbbf24; font-weight: bold;">⭐ ${s.nota}</span>
          <span class="tag is-dark" style="border-radius: 4px; color: #fff !important;">${s.ano}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (append) {
    grid.innerHTML += htmlCards; // Adiciona os novos cards embaixo
  } else {
    grid.innerHTML = htmlCards;
  }
}

function activarBotoesVerMaisSeries() {
  const botoes = document.querySelectorAll('.btn-ver-mais-serie');
  botoes.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const generoId = e.currentTarget.getAttribute('data-id');
      
      // Avança a página apenas para essa categoria de séries
      paginasPorGeneroSeries[generoId] += 1;
      const proximaPagina = paginasPorGeneroSeries[generoId];

      e.currentTarget.classList.add('is-loading');

      let novasSeries = [];
      if (generoId === 'destaque') {
        novasSeries = await buscarMidiaAPI('', 'tv', proximaPagina);
      } else {
        novasSeries = await obterPorGenero('tv', generoId, proximaPagina);
      }

      renderizarSeriesNoGrid(generoId, novasSeries, true);
      e.currentTarget.classList.remove('is-loading');
    });
  });
}

function activarBuscaEscritaSeries() {
  const input = document.getElementById('input-serie');
  const btn = document.getElementById('btn-buscar-serie');
  const container = document.getElementById('secoes-series-container');

  if (!input || !btn || !container) return;

  const buscarManualSeries = async () => {
    const termo = input.value.trim();
    if (!termo) {
      carregarSecoesSeries(); // Se limpar, volta ao catálogo de gêneros
      return;
    }

    container.innerHTML = `
      <div class="genero-secao mb-6">
        <h2 class="title is-4 mb-4 has-text-white" style="font-weight: 800; border-left: 4px solid #E50914; padding-left: 10px;">
          Resultados da busca para "${termo}"
        </h2>
        <div id="grid-busca-resultados-series" class="bem-grid-auto">
          <p class="has-text-grey">Buscando séries...</p>
        </div>
      </div>
    `;

    const resultados = await buscarMidiaAPI(termo, 'tv', 1);
    const gridBusca = document.getElementById('grid-busca-resultados-series');
    
    if (resultados.length === 0) {
      gridBusca.innerHTML = '<p class="has-text-grey">Nenhuma série encontrada para essa busca.</p>';
      return;
    }

    gridBusca.innerHTML = resultados.map(s => `
      <div class="card card-clicavel bem-card animate-pop" onclick="abrirDetalhes(${s.id}, 'tv')">
        <div class="card-image-container">
          <img src="${s.imagem}" alt="${s.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295?text=Sem+Capa'">
          <div class="card-hover-overlay">
            <button class="button is-danger is-rounded font-weight-bold">Ver Detalhes</button>
          </div>
        </div>
        <div class="card-content py-4 px-3">
          <h3 class="title is-6 has-text-white mb-2" style="font-weight: 700; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
            ${s.titulo}
          </h3>
          <div class="d-flex align-items-center justify-content-between" style="font-size: 0.85rem;">
            <span style="color: #fbbf24; font-weight: bold;">⭐ ${s.nota}</span>
            <span class="tag is-dark" style="border-radius: 4px; color: #fff !important;">${s.ano}</span>
          </div>
        </div>
      </div>
    `).join('');
  };

  btn.addEventListener('click', buscarManualSeries);
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') buscarManualSeries();
  });
}

export default { url: '#series', label: 'Séries', pagina: series };