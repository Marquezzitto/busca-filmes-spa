// src/js/main.js
import navbar from "./componentes/navbar/navbar.js";
import roteador from "./componentes/rotas/rotas.js";
import footer from "./componentes/footer/footer.js";
import NaoEncontrado from "./componentes/paginas/NaoEncontrado.js";
import { inicializarChatbot } from "./componentes/chatbot/chatbot.js";
import { obterDetalhesMidia } from "./componentes/services/api.js";

// Inicializa componentes globais
navbar(roteador);
footer();
inicializarChatbot();

const app = document.getElementById('app');

const mapaDeRotas = {};
for (const rota of roteador) {
  mapaDeRotas[rota.url] = rota;
}

// GERENCIAMENTO DE TEMA (Netflix/HBO Dark/Light)
function inicializarTema() {
  const temaSalvo = localStorage.getItem('hbo_theme') || 'theme-hbo-dark';
  document.body.className = '';
  document.body.classList.add(temaSalvo);
}

window.alternarTemaGlobal = function() {
  const atual = document.body.classList.contains('theme-hbo-dark') ? 'theme-hbo-dark' : 'theme-hbo-light';
  const novo = atual === 'theme-hbo-dark' ? 'theme-hbo-light' : 'theme-hbo-dark';
  
  document.body.className = '';
  document.body.classList.add(novo);
  localStorage.setItem('hbo_theme', novo);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
};

// PLAYER DE VIDEO DINÂMICO DO YOUTUBE
window.carregarVideoNoModal = function(videoId) {
  const previewArea = document.getElementById('media-preview');
  if (!videoId) {
    alert("Infelizmente, não há nenhum trailer oficial registrado no TMDB para esta obra.");
    return;
  }
  if (previewArea) {
    previewArea.innerHTML = `
      <div class="video-responsive-container" style="width: 100%; height: 100%; min-height: 440px; background: #000;">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0" 
          style="width: 100%; height: 100%; border: 0; min-height: 440px;" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  }
};

// 🎬 SISTEMA DE DETALHES GLOBAL DO TMDB (MODAL CINEMÁTICO AMPLO)
window.abrirDetalhes = async function(id, tipo = 'movie') {
  let modalElement = document.getElementById('modal-detalhes');
  if (!modalElement) {
    modalElement = document.createElement('div');
    modalElement.id = 'modal-detalhes';
    modalElement.className = 'modal is-active';
    document.body.appendChild(modalElement);
  }

  modalElement.innerHTML = `
    <div class="modal-background" onclick="window.fecharModal()"></div>
    <div class="modal-card modal-netflix-card">
      <header class="modal-card-head d-flex justify-content-between align-items-center">
        <p class="modal-card-title font-weight-bold">Carregando...</p>
        <button class="delete" aria-label="close" onclick="window.fecharModal()"></button>
      </header>
      <section class="modal-card-body d-flex align-items-center justify-content-center py-6">
        <p><i data-lucide="loader" class="spinner mr-2"></i>Buscando ficha técnica no TMDB...</p>
      </section>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Busca dados na API do TMDB enviando ID e Tipo (movie ou tv)
  const obra = await obterDetalhesMidia(id, tipo);

  if (!obra) {
    modalElement.querySelector('.modal-card-body').innerHTML = `
      <p class="has-text-danger has-text-centered">Não foi possível conectar ao servidor da API. Verifique se configurou a API_KEY no topo do seu api.js!</p>
    `;
    return;
  }

  const botaoSiteHTML = obra.siteOficial 
    ? `<a href="${obra.siteOficial}" target="_blank" class="button is-dark is-outlined py-5" style="border-radius: 8px; font-weight: bold;">
         <span class="icon"><i data-lucide="external-link"></i></span>
         <span>Site Oficial</span>
       </a>`
    : '';

  modalElement.innerHTML = `
    <div class="modal-background" onclick="window.fecharModal()"></div>
    <div class="modal-card modal-netflix-card animate-pop">
      <section class="modal-card-body p-0" style="overflow-y: auto; max-height: 85vh; border-radius: 12px; border: 1px solid var(--border-light);">
        <div class="columns is-gapless m-0">
          
          <!-- Coluna Esquerda: Pôster / Player de Vídeo -->
          <div class="column is-5" id="media-preview">
            <div style="width: 100%; height: 100%; min-height: 440px; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
              <img src="${obra.imagem}" alt="${obra.titulo}" style="width: 100%; height: 100%; object-fit: contain;">
              <div style="position: absolute; bottom: 15px; background: rgba(0,0,0,0.7); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; color: #fff;">
                <i data-lucide="image" style="width:12px; height:12px; vertical-align: middle; display: inline-block;"></i> Capa do Título
              </div>
            </div>
          </div>
          
          <!-- Coluna Direita: Informações detalhadas e Ficha Técnica Completa -->
          <div class="column is-7 p-5 d-flex flex-column" style="justify-content: space-between;">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h2 class="title is-3 mb-0" style="font-weight: 800;">${obra.titulo}</h2>
                <button class="delete" aria-label="close" onclick="window.fecharModal()"></button>
              </div>
              
              <div class="tags mb-3">
                <span class="tag is-danger font-weight-bold" style="background-color: #E50914 !important; color: #fff !important;">${obra.ano}</span>
                <span class="tag is-warning" style="font-weight: bold; color: #000 !important;">⭐ ${obra.nota}</span>
                <span class="tag is-dark" style="color: #fff !important;">${obra.genero}</span>
              </div>
              
              <!-- Sinopse -->
              <div class="content mb-4" style="font-size: 0.95rem; line-height: 1.5; max-height: 160px; overflow-y: auto;">
                ${obra.sinopse}
              </div>

              <!-- Ficha Técnica Completa -->
              <hr style="margin: 0.8rem 0; background-color: var(--border-light); height: 1px;">
              <div class="columns is-multiline is-mobile" style="font-size: 0.85rem;">
                <div class="column is-6 py-1">
                  <strong><i data-lucide="languages" style="width:14px; height:14px; vertical-align: middle;" class="mr-1"></i> Idioma:</strong> <span>${obra.idioma}</span>
                </div>
                <div class="column is-6 py-1">
                  <strong><i data-lucide="clock" style="width:14px; height:14px; vertical-align: middle;" class="mr-1"></i> Duração:</strong> <span>${obra.duracao}</span>
                </div>
                <div class="column is-6 py-1">
                  <strong><i data-lucide="tv" style="width:14px; height:14px; vertical-align: middle;" class="mr-1"></i> Estúdio/Rede:</strong> <span>${obra.emissora}</span>
                </div>
                <div class="column is-6 py-1">
                  <strong><i data-lucide="info" style="width:14px; height:14px; vertical-align: middle;" class="mr-1"></i> Status:</strong> <span>${obra.status}</span>
                </div>
                <div class="column is-12 py-1">
                  <strong><i data-lucide="users" style="width:14px; height:14px; vertical-align: middle;" class="mr-1"></i> Elenco Principal:</strong> <span style="font-style: italic;">${obra.atores}</span>
                </div>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="d-flex gap-2 mt-4">
              <!-- Executa a chave dinâmica de vídeo direto do YouTube -->
              <button onclick="window.carregarVideoNoModal('${obra.youtubeKey}')" class="button is-danger is-flex-grow-1 py-5" style="border-radius: 8px; font-weight: bold; background-color: #E50914 !important; color: #fff !important; flex-grow: 1;">
                <span class="icon"><i data-lucide="play"></i></span>
                <span>Assistir Trailer Oficial</span>
              </button>
              ${botaoSiteHTML}
            </div>
          </div>

        </div>
      </section>
    </div>
  `;
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.fecharModal = function() {
  const modal = document.getElementById('modal-detalhes');
  if (modal) modal.remove();
};

let hash = window.location.hash || '#home';
inicializarTema();
render();

window.addEventListener("hashchange", () => {
  hash = window.location.hash;
  render();
});

async function render() {
  const rotaAtual = mapaDeRotas[hash] || NaoEncontrado;
  await rotaAtual.pagina(app);
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}
