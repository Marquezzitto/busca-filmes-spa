// src/js/components/paginas/series.js
import { buscarMidiaAPI } from '../../services/api.js';

export function Series() {
  return `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Séries</h1>
      <div class="busca-box">
        <input type="text" id="input-serie" class="input" placeholder="Digite o nome da série (ex: Dark, Office)...">
        <button id="btn-buscar-serie" class="btn">Buscar</button>
      </div>
      <div id="lista-series" class="cards-grid"></div>
    </section>
  `;
}

export function carregarSeries() {
  const input = document.getElementById('input-serie');
  const btn = document.getElementById('btn-buscar-serie');
  const container = document.getElementById('lista-series');

  // Busca inicial padrão ao carregar a página
  executarBusca('drama');

  if (btn && input) {
    btn.addEventListener('click', () => {
      const termo = input.value.trim();
      if (termo) executarBusca(termo);
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const termo = input.value.trim();
        if (termo) executarBusca(termo);
      }
    });
  }

  async function executarBusca(termo) {
    if (!container) return;
    container.innerHTML = `<p class="mensagem">Carregando séries da API...</p>`;

    try {
      const series = await buscarMidiaAPI(termo);

      if (series.length === 0) {
        container.innerHTML = `<p class="mensagem">Nenhuma série encontrada para "${termo}".</p>`;
        return;
      }

      container.innerHTML = series.map(s => `
        <div class="card">
          <img src="${s.imagem}" alt="${s.titulo}" class="card__imagem" />
          <h3 class="card__titulo">${s.titulo}</h3>
          <p class="card__info"><strong>Ano:</strong> ${s.ano}</p>
          <p class="card__info"><strong>Nota:</strong> ⭐ ${s.nota}</p>
          <p class="card__info"><strong>Gênero:</strong> ${s.genero}</p>
        </div>
      `).join('');
    } catch (erro) {
      container.innerHTML = `<p class="mensagem mensagem--erro">Falha ao carregar dados da API. Tente novamente.</p>`;
    }
  }
}