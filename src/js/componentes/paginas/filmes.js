// src/js/componentes/paginas/filmes.js
import { buscarMidiaAPI, obterPorGenero } from '../services/api.js';

// Lista de todos os gêneros oficiais de filmes do TMDB
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

async function filmes(app) {
  app.innerHTML = `
    <section class="container my-6 px-4">
      <h1 class="title is-2 has-text-white mb-2" style="font-weight: 800; background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Catálogo de Filmes</h1>
      <p class="subtitle is-6 has-text-grey mb-6">Navegue pelas maiores produções e categorias do cinema mundial.</p>
      
      <!-- Caixa de Busca -->
      <div class="busca-box mb-6" style="display: flex; gap: 10px; max-width: 600px;">
        <input type="text" id="input-filme" class="input is-rounded" placeholder="Digite o nome do filme para buscar...">
        <button id="btn-buscar-filme" class="button is-link is-rounded">Buscar</button>
      </div>

      <!-- Container de Fileiras de Gêneros de Filmes (Estilo Netflix) -->
      <div id="secoes-filmes-container" class="secoes-verticais-container">
        <!-- Estruturas de gêneros serão injetadas aqui via JS -->
      </div>
    </section>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Carrega todas as seções de filmes verticalmente
  carregarSecoesFilmes();
  
  // Ativa a barra de busca por digitação escrita
  ativarBuscaEscrita();
}

async function carregarSecoesFilmes() {
  const container = document.getElementById('secoes-filmes-container');
  if (!container) return;

  // Cria as seções no estilo horizontal
  container.innerHTML = TODOS_GENEROS_FILMES.map(g => `
    <div class="mb-6" id="secao-filme-${g.id}">
      <h2 class="title is-4 mb-4 has-text-white" style="font-weight: 800; font-size: 1.5rem; letter-spacing: -0.5px;">
        ${g.nome}
      </h2>
      <div class="netflix-row-container">
        <div id="row-filme-${g.id}" class="netflix-row">
          <p class="has-text-grey">Carregando...</p>
        </div>
      </div>
      <!-- Botão com controle de estado para expandir/recuar -->
      <div class="has-text-centered mt-3">
        <button class="button is-danger is-outlined is-small btn-ver-mais-filme" data-id="${g.id}" data-expandido="false" style="border-radius: 6px; font-weight: bold;">
          Ver Mais ${g.nome}
        </button>
      </div>
    </div>
  `).join('');

  // Preenche cada fileira de filmes (Página 1 inicial com os primeiros 20)
  TODOS_GENEROS_FILMES.forEach(async (g) => {
    let resultados = [];
    if (g.id === 'destaque') {
      resultados = await buscarMidiaAPI('', 'movie', 1);
    } else {
      resultados = await obterPorGenero('movie', g.id, 1);
    }
    renderizarFilmesNaFileira(g.id, resultados, false);
  });

  // Ativa a lógica dinâmica de "Ver Mais / Ver Menos"
  ativarBotoesVerMaisFilmes();
}

function renderizarFilmesNaFileira(generoId, listaFilmes, append = false) {
  const row = document.getElementById(`row-filme-${generoId}`);
  if (!row) return;

  if (!append && listaFilmes.length === 0) {
    row.innerHTML = '<p class="has-text-grey">Nenhum título encontrado.</p>';
    return;
  }

  const htmlCards = listaFilmes.map(f => `
    <div class="netflix-item" onclick="abrirDetalhes(${f.id}, 'movie')">
      <div class="netflix-item-card">
        <img src="${f.imagem}" alt="${f.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295?text=Sem+Capa'">
        <div class="netflix-item-hover">
          <h4 class="title is-6 has-text-white mb-2" style="font-weight: bold; font-size: 0.9rem;">${f.titulo}</h4>
          <div class="d-flex align-items-center justify-content-between" style="font-size: 0.8rem; width: 100%;">
            <span style="color: #fbbf24; font-weight: bold;"><i data-lucide="star" style="width:12px; height:12px; fill: #fbbf24; vertical-align: middle;"></i> ${f.nota}</span>
            <span class="tag is-dark py-1 px-2" style="font-size: 0.75rem; border-radius: 4px; color: #fff !important;">${f.ano}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (append) {
    row.innerHTML += htmlCards; // Adiciona na sequência da fileira horizontal
  } else {
    row.innerHTML = htmlCards;
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function ativarBotoesVerMaisFilmes() {
  const botoes = document.querySelectorAll('.btn-ver-mais-filme');
  botoes.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const generoId = e.currentTarget.getAttribute('data-id');
      const estaExpandido = e.currentTarget.getAttribute('data-expandido') === 'true';
      const gObj = TODOS_GENEROS_FILMES.find(g => g.id.toString() === generoId.toString());
      const nomeGenero = gObj ? gObj.nome : '';
      const row = document.getElementById(`row-filme-${generoId}`);
      if (!row) return;

      if (!estaExpandido) {
        // 🚀 VER MAIS: Carrega os 20 filmes extras da página 2 e adiciona no final
        e.currentTarget.classList.add('is-loading');
        
        try {
          let novosFilmes = [];
          if (generoId === 'destaque') {
            novosFilmes = await buscarMidiaAPI('', 'movie', 2);
          } else {
            novosFilmes = await obterPorGenero('movie', generoId, 2);
          }

          if (novosFilmes && novosFilmes.length > 0) {
            renderizarFilmesNaFileira(generoId, novosFilmes, true); // append = true
            e.currentTarget.setAttribute('data-expandido', 'true');
            e.currentTarget.innerHTML = `Ver Menos ${nomeGenero}`;
          }
        } catch (error) {
          console.error("Erro ao carregar mais filmes:", error);
        }
        
        e.currentTarget.classList.remove('is-loading');
      } else {
        // 🔙 VER MENOS: Remove todos os itens além dos 20 primeiros instantaneamente
        const items = row.querySelectorAll('.netflix-item');
        if (items.length > 20) {
          for (let i = 20; i < items.length; i++) {
            items[i].remove();
          }
        }
        e.currentTarget.setAttribute('data-expandido', 'false');
        e.currentTarget.innerHTML = `Ver Mais ${nomeGenero}`;
      }
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
      carregarSecoesFilmes();
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