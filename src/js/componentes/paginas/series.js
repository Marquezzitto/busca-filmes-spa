// src/js/componentes/paginas/series.js
import { buscarMidiaAPI, obterPorGenero } from '../services/api.js';

// Lista de todos os gêneros oficiais de séries do TMDB
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

async function series(app) {
  app.innerHTML = `
    <section class="container my-6 px-4">
      <h1 class="title is-2 has-text-white mb-2" style="font-weight: 800; background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Catálogo de Séries</h1>
      <p class="subtitle is-6 has-text-grey mb-6">Acompanhe suas séries, animes e novelas preferidas por categorias.</p>
      
      <!-- Caixa de Busca -->
      <div class="busca-box mb-6" style="display: flex; gap: 10px; max-width: 600px;">
        <input type="text" id="input-serie" class="input is-rounded" placeholder="Digite o nome da série para buscar...">
        <button id="btn-buscar-serie" class="button is-link is-rounded">Buscar</button>
      </div>

      <!-- Container de Fileiras de Gêneros (Estilo Netflix) -->
      <div id="secoes-series-container" class="secoes-verticais-container">
        <!-- Estruturas de gêneros serão injetadas aqui via JS -->
      </div>
    </section>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Carrega todas as seções de séries verticalmente
  carregarSecoesSeries();
  
  // Ativa a barra de busca por digitação escrita
  ativarBuscaEscritaSeries();
}

async function carregarSecoesSeries() {
  const container = document.getElementById('secoes-series-container');
  if (!container) return;

  // Cria as seções no estilo horizontal
  container.innerHTML = TODOS_GENEROS_SERIES.map(g => `
    <div class="mb-6" id="secao-serie-${g.id}">
      <h2 class="title is-4 mb-4 has-text-white" style="font-weight: 800; font-size: 1.5rem; letter-spacing: -0.5px;">
        ${g.nome}
      </h2>
      <div class="netflix-row-container">
        <div id="row-serie-${g.id}" class="netflix-row">
          <p class="has-text-grey">Carregando...</p>
        </div>
      </div>
      <!-- Botão com controle de estado para expandir/recuar -->
      <div class="has-text-centered mt-3">
        <button class="button is-danger is-outlined is-small btn-ver-mais-serie" data-id="${g.id}" data-expandido="false" style="border-radius: 6px; font-weight: bold;">
          Ver Mais ${g.nome}
        </button>
      </div>
    </div>
  `).join('');

  // Preenche cada fileira de séries (Página 1 inicial com os primeiros 20)
  TODOS_GENEROS_SERIES.forEach(async (g) => {
    let resultados = [];
    if (g.id === 'destaque') {
      resultados = await buscarMidiaAPI('', 'tv', 1);
    } else {
      resultados = await obterPorGenero('tv', g.id, 1);
    }
    renderizarSeriesNaFileira(g.id, resultados, false);
  });

  // Ativa a lógica dinâmica de "Ver Mais / Ver Menos"
  ativarBotoesVerMaisSeries();
}

function renderizarSeriesNaFileira(generoId, listaSeries, append = false) {
  const row = document.getElementById(`row-serie-${generoId}`);
  if (!row) return;

  if (!append && listaSeries.length === 0) {
    row.innerHTML = '<p class="has-text-grey">Nenhum título encontrado.</p>';
    return;
  }

  const htmlCards = listaSeries.map(s => `
    <div class="netflix-item" onclick="abrirDetalhes(${s.id}, 'tv')">
      <div class="netflix-item-card">
        <img src="${s.imagem}" alt="${s.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295?text=Sem+Capa'">
        <div class="netflix-item-hover">
          <h4 class="title is-6 has-text-white mb-2" style="font-weight: bold; font-size: 0.9rem;">${s.titulo}</h4>
          <div class="d-flex align-items-center justify-content-between" style="font-size: 0.8rem; width: 100%;">
            <span style="color: #fbbf24; font-weight: bold;"><i data-lucide="star" style="width:12px; height:12px; fill: #fbbf24; vertical-align: middle;"></i> ${s.nota}</span>
            <span class="tag is-dark py-1 px-2" style="font-size: 0.75rem; border-radius: 4px; color: #fff !important;">${s.ano}</span>
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

function ativarBotoesVerMaisSeries() {
  const botoes = document.querySelectorAll('.btn-ver-mais-serie');
  botoes.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const generoId = e.currentTarget.getAttribute('data-id');
      const estaExpandido = e.currentTarget.getAttribute('data-expandido') === 'true';
      const gObj = TODOS_GENEROS_SERIES.find(g => g.id.toString() === generoId.toString());
      const nomeGenero = gObj ? gObj.nome : '';
      const row = document.getElementById(`row-serie-${generoId}`);
      if (!row) return;

      if (!estaExpandido) {
        // 🚀 VER MAIS: Carrega as 20 séries extras da página 2 e adiciona no final
        e.currentTarget.classList.add('is-loading');
        
        try {
          let novasSeries = [];
          if (generoId === 'destaque') {
            novasSeries = await buscarMidiaAPI('', 'tv', 2);
          } else {
            novasSeries = await obterPorGenero('tv', generoId, 2);
          }

          if (novasSeries && novasSeries.length > 0) {
            renderizarSeriesNaFileira(generoId, novasSeries, true); // append = true
            e.currentTarget.setAttribute('data-expandido', 'true');
            e.currentTarget.innerHTML = `Ver Menos ${nomeGenero}`;
          }
        } catch (error) {
          console.error("Erro ao carregar mais séries:", error);
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

function ativarBuscaEscritaSeries() {
  const input = document.getElementById('input-serie');
  const btn = document.getElementById('btn-buscar-serie');
  const container = document.getElementById('secoes-series-container');

  if (!input || !btn || !container) return;

  const buscarManualSeries = async () => {
    const termo = input.value.trim();
    if (!termo) {
      carregarSecoesSeries();
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