// src/js/componentes/paginas/home.js
import { obterDestaquesCarrossel, obterEmAlta, obterMelhoresFilmes, obterMelhoresSeries } from '../services/api.js';

async function home(app) {
  app.innerHTML = `
    <!-- 🌟 BANNER DE CARROSSEL HERO GIGANTE -->
    <div class="prime-hero-carousel">
      <div id="carousel-slides-container">
        <!-- Slides gerados via JS -->
      </div>
      <!-- Controles de Navegação -->
      <button class="carousel-control prev" id="carousel-prev" aria-label="Anterior">
        <i data-lucide="chevron-left"></i>
      </button>
      <button class="carousel-control next" id="carousel-next" aria-label="Próximo">
        <i data-lucide="chevron-right"></i>
      </button>
      <!-- Indicadores (Dots) -->
      <div class="carousel-dots" id="carousel-dots"></div>
    </div>

    <!-- 🌟 CONTEÚDO DAS LISTAS ESTILO NETFLIX -->
    <section class="container my-6 px-4">
      
      <!-- Seção 1: Em Alta -->
      <div class="mb-6">
        <h2 class="title is-4 mb-4" style="font-weight: 800; font-size: 1.5rem; letter-spacing: -0.5px;">
          Em Alta
        </h2>
        <div class="netflix-row-container">
          <div id="row-em-alta" class="netflix-row"></div>
        </div>
      </div>

      <!-- Seção 2: Melhores Filmes -->
      <div class="mb-6">
        <h2 class="title is-4 mb-4" style="font-weight: 800; font-size: 1.5rem; letter-spacing: -0.5px;">
          Melhores Filmes
        </h2>
        <div class="netflix-row-container">
          <div id="row-melhores-filmes" class="netflix-row"></div>
        </div>
      </div>

      <!-- Seção 3: Melhores Séries -->
      <div class="mb-6">
        <h2 class="title is-4 mb-4" style="font-weight: 800; font-size: 1.5rem; letter-spacing: -0.5px;">
          Melhores Séries
        </h2>
        <div class="netflix-row-container">
          <div id="row-melhores-series" class="netflix-row"></div>
        </div>
      </div>

    </section>
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Dispara o carregamento do conteúdo em segundo plano
  carregarConteudoHome();
}

async function carregarConteudoHome() {
  const [destaques, emAlta, melhoresFilmes, melhoresSeries] = await Promise.all([
    obterDestaquesCarrossel(),
    obterEmAlta(),
    obterMelhoresFilmes(),
    obterMelhoresSeries()
  ]);

  // Renderiza o carrossel no topo
  renderizarCarrossel(destaques);

  // Renderiza as fileiras horizontais
  desenharFileiraHorizontal('row-em-alta', emAlta);
  desenharFileiraHorizontal('row-melhores-filmes', melhoresFilmes);
  desenharFileiraHorizontal('row-melhores-series', melhoresSeries);
}

function renderizarCarrossel(destaques) {
  const container = document.getElementById('carousel-slides-container');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!container || !destaques || destaques.length === 0) return;

  container.innerHTML = destaques.map((item, index) => `
    <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${item.imagemFundo}');">
      <div class="hero-gradient-overlay"></div>
      <div class="hero-content">
        <span class="tag is-danger font-weight-bold mb-3" style="background-color: #E50914 !important; border-radius: 4px;">DESTAQUE</span>
        <h2 class="title is-1 has-text-white mb-3" style="font-weight: 900; line-height: 1.1;">${item.titulo}</h2>
        <p class="subtitle is-5 has-text-warning mb-4" style="font-weight: bold;">⭐ ${item.nota} no TMDB</p>
        <p class="hero-overview mb-5">${item.sinopse}</p>
        
        <button onclick="abrirDetalhes(${item.id}, 'movie')" class="button is-danger is-medium px-5 py-3" style="border-radius: 8px; font-weight: bold; background: #E50914 !important;">
          <span class="icon"><i data-lucide="play"></i></span>
          <span>Mais Informações</span>
        </button>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = destaques.map((_, index) => `
    <span class="dot ${index === 0 ? 'active' : ''}" onclick="window.irParaSlide(${index})"></span>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();

  let slideAtual = 0;
  const slides = container.querySelectorAll('.hero-slide');
  const dots = dotsContainer.querySelectorAll('.dot');
  let intervalId;

  function mostrarSlide(index) {
    if (slides.length === 0) return;
    slides[slideAtual].classList.remove('active');
    dots[slideAtual].classList.remove('active');
    
    slideAtual = (index + slides.length) % slides.length;
    
    slides[slideAtual].classList.add('active');
    dots[slideAtual].classList.add('active');
  }

  window.irParaSlide = function(index) {
    mostrarSlide(index);
    reiniciarIntervalo();
  };

  document.getElementById('carousel-next').addEventListener('click', () => {
    mostrarSlide(slideAtual + 1);
    reiniciarIntervalo();
  });

  document.getElementById('carousel-prev').addEventListener('click', () => {
    mostrarSlide(slideAtual - 1);
    reiniciarIntervalo();
  });

  function iniciarIntervalo() {
    intervalId = setInterval(() => {
      mostrarSlide(slideAtual + 1);
    }, 6000); 
  }

  function reiniciarIntervalo() {
    clearInterval(intervalId);
    iniciarIntervalo();
  }

  iniciarIntervalo();
}

function desenharFileiraHorizontal(containerId, lista) {
  const container = document.getElementById(containerId);
  if (!container || !lista || lista.length === 0) return;

  container.innerHTML = lista.map(item => `
    <div class="netflix-item" onclick="abrirDetalhes(${item.id}, '${item.tipo}')">
      <div class="netflix-item-card">
        <img src="${item.imagem}" alt="${item.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295?text=Sem+Capa'">
        <div class="netflix-item-hover">
          <h4 class="title is-6 has-text-white mb-2" style="font-weight: bold; font-size: 0.9rem;">${item.titulo}</h4>
          <div class="d-flex align-items-center justify-content-between" style="font-size: 0.8rem; width: 100%;">
            <span style="color: #fbbf24; font-weight: bold;"><i data-lucide="star" style="width:12px; height:12px; fill: #fbbf24; vertical-align: middle;"></i> ${item.nota}</span>
            <span class="tag is-dark py-1 px-2" style="font-size: 0.75rem; border-radius: 4px; color: #fff !important;">${item.ano}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

export default {
  url: '#home',
  label: 'Home',
  pagina: home
};
