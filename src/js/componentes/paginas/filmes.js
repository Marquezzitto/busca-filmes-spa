// src/js/componentes/paginas/filmes.js
import { buscarMidiaAPI, obterPorGenero } from '../services/api.js';

// 🌟 LISTA DE ABSOLUTAMENTE TODOS OS GÊNEROS OFICIAIS DE FILMES DO TMDB
const TODOS_GENEROS_FILMES = [
  { id: 'destaque', nome: 'Filmes em Destaque' },
  { id: 28, nome: 'Ação' },
  { id: 12, nome: 'Aventura' },
  { id: 16, nome: 'Animação' },
  { id: 35, nome: 'Comédia' },
  { id: 80, nome: 'Crime' },
  { id: 99, nome: 'Documentário' },
  { id: 18, nome: 'Drama' },
  { id: 10751, nome: 'Família' },
  { id: 14, nome: 'Fantasia' },
  { id: 36, nome: 'História' },
  { id: 27, nome: 'Terror' },
  { id: 10402, nome: 'Música' },
  { id: 9648, nome: 'Mistério' },
  { id: 10749, nome: 'Romance' },
  { id: 878, nome: 'Ficção Científica' },
  { id: 10770, nome: 'Cinema TV' },
  { id: 53, nome: 'Suspense' },
  { id: 10752, nome: 'Guerra' },
  { id: 37, nome: 'Faroeste' }
];

// Monitora de forma independente qual página da API está carregada em cada gênero
const paginasPorGeneroFilmes = {};

async function filmes(app) {
  // Inicializa o controle de páginas (começando na página 1) para cada gênero de filme
  TODOS_GENEROS_FILMES.forEach(g => {
    paginasPorGeneroFilmes[g.id] = 1;
  });

  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Filmes</h1>
      <p class="pagina__descricao">Navegue por todas as categorias do cinema mundial.</p>
      
      <!-- Caixa de Busca (Pesquisa em todo o catálogo ao digitar) -->
      <div class="busca-box mb-6">
        <input type="text" id="input-filme" class="input" placeholder="Digite o nome do filme para buscar...">
        <button id="btn-buscar-filme" class="btn">Buscar</button>
      </div>

      <!-- Container das Seções de Gêneros de Filmes -->
      <div id="secoes-filmes-container" class="secoes-verticais-container">
        <!-- Estruturas de gêneros serão injetadas aqui -->
      </div>
    </section>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Carrega todas as seções de filmes verticalmente
  carregarSecoesFilmes();
  
  // Ativa a barra de busca por digitação
  ativarBuscaEscrita();
}

async function carregarSecoesFilmes() {
  const container = document.getElementById('secoes-filmes-container');
  if (!container) return;

  // 1. Cria o esqueleto visual das seções para todos os gêneros
  container.innerHTML = TODOS_GENEROS_FILMES.map(g => `
    <div class="genero-secao mb-6" id="secao-filme-${g.id}">
      <h2 class="title is-4 mb-4 has-text-white" style="font-weight: 800; border-left: 4px solid #E50914; padding-left: 10px;">
        ${g.nome}
      </h2>
      <div id="grid-filme-${g.id}" class="bem-grid-auto">
        <p class="has-text-grey">Carregando catálogo...</p>
      </div>
      <div class="has-text-centered mt-4">
        <button class="button is-danger is-outlined btn-ver-mais-filme" data-id="${g.id}">
          Ver Mais ${g.nome}
        </button>
      </div>
    </div>
  `).join('');

  // 2. Preenche cada seção de filme com dados reais da API (Página 1)
  TODOS_GENEROS_FILMES.forEach(async (g) => {
    let resultados = [];
    if (g.id === 'destaque') {
      resultados = await buscarMidiaAPI('', 'movie', 1);
    } else {
      resultados = await obterPorGenero('movie', g.id, 1);
    }
    renderizarFilmesNoGrid(g.id, resultados, false);
  });

  // 3. Ativa o clique dos botões "Ver Mais"
  ativarBotoesVerMaisFilmes();
}

function renderizarFilmesNoGrid(generoId, listaFilmes, append = false) {
  const grid = document.getElementById(`grid-filme-${generoId}`);
  if (!grid) return;

  if (!append && listaFilmes.length === 0) {
    grid.innerHTML = '<p class="has-text-grey">Nenhum título encontrado nesta categoria no momento.</p>';
    return;
  }

  const htmlCards = listaFilmes.map(f => `
    <div class="card card-clicavel bem-card animate-pop" onclick="abrirDetalhes(${f.id}, 'movie')">
      <div class="card-image-container">
        <img src="${f.imagem}" alt="${f.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295?text=Sem+Capa'">
        <div class="card-hover-overlay">
          <button class="button is-danger is-rounded font-weight-bold">Ver Detalhes</button>
        </div>
      </div>
      <div class="card-content py-4 px-3">
        <h3 class="title is-6 has-text-white mb-2" style="font-weight: 700; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
          ${f.titulo}
        </h3>
        <div class="d-flex align-items-center justify-content-between" style="font-size: 0.85rem;">
          <span style="color: #fbbf24; font-weight: bold;">⭐ ${f.nota}</span>
          <span class="tag is-dark" style="border-radius: 4px; color: #fff !important;">${f.ano}</span>
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

function ativarBotoesVerMaisFilmes() {
  const botoes = document.querySelectorAll('.btn-ver-mais-filme');
  botoes.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const generoId = e.currentTarget.getAttribute('data-id');
      
      // Avança a página apenas para essa categoria específica
      paginasPorGeneroFilmes[generoId] += 1;
      const proximaPagina = paginasPorGeneroFilmes[generoId];

      e.currentTarget.classList.add('is-loading');

      let novosFilmes = [];
      if (generoId === 'destaque') {
        novosFilmes = await buscarMidiaAPI('', 'movie', proximaPagina);
      } else {
        novosFilmes = await obterPorGenero('movie', generoId, proximaPagina);
      }

      renderizarFilmesNoGrid(generoId, novosFilmes, true);
      e.currentTarget.classList.remove('is-loading');
    });
  });
}

function ativarBuscaEscrita() {
  const input = document.getElementById('input-filme');
  const btn = document.getElementById('btn-buscar-filme');
  const container = document.getElementById('secoes-filmes-container');

  if (!input || !btn || !container) return;

  const buscarManual = async () => {
    const termo = input.value.trim();
    if (!termo) {
      carregarSecoesFilmes(); // Se limpar o campo, recarrega o catálogo de gêneros
      return;
    }

    container.innerHTML = `
      <div class="genero-secao mb-6">
        <h2 class="title is-4 mb-4 has-text-white" style="font-weight: 800; border-left: 4px solid #E50914; padding-left: 10px;">
          Resultados da busca para "${termo}"
        </h2>
        <div id="grid-busca-resultados" class="bem-grid-auto">
          <p class="has-text-grey">Buscando filmes...</p>
        </div>
      </div>
    `;

    const resultados = await buscarMidiaAPI(termo, 'movie', 1);
    const gridBusca = document.getElementById('grid-busca-resultados');
    
    if (resultados.length === 0) {
      gridBusca.innerHTML = '<p class="has-text-grey">Nenhum filme encontrado para essa busca.</p>';
      return;
    }

    gridBusca.innerHTML = resultados.map(f => `
      <div class="card card-clicavel bem-card animate-pop" onclick="abrirDetalhes(${f.id}, 'movie')">
        <div class="card-image-container">
          <img src="${f.imagem}" alt="${f.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295?text=Sem+Capa'">
          <div class="card-hover-overlay">
            <button class="button is-danger is-rounded font-weight-bold">Ver Detalhes</button>
          </div>
        </div>
        <div class="card-content py-4 px-3">
          <h3 class="title is-6 has-text-white mb-2" style="font-weight: 700; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
            ${f.titulo}
          </h3>
          <div class="d-flex align-items-center justify-content-between" style="font-size: 0.85rem;">
            <span style="color: #fbbf24; font-weight: bold;">⭐ ${f.nota}</span>
            <span class="tag is-dark" style="border-radius: 4px; color: #fff !important;">${f.ano}</span>
          </div>
        </div>
      </div>
    `).join('');
  };

  btn.addEventListener('click', buscarManual);
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') buscarManual();
  });
}

export default { url: '#filmes', label: 'Filmes', pagina: filmes };
