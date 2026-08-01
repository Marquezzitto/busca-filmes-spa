// src/js/components/paginas/filmes.js
import { buscarMidiaAPI } from '../../services/api.js';

export function Filmes() {
  return `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Filmes</h1>
      <div class="busca-box">
        <input type="text" id="input-filme" class="input" placeholder="Digite o nome do filme (ex: Batman, Matrix)...">
        <button id="btn-buscar-filme" class="btn">Buscar</button>
      </div>
      <div id="lista-filmes" class="cards-grid"></div>
    </section>
  `;
}

export function carregarFilmes() {
  const input = document.getElementById('input-filme');
  const btn = document.getElementById('btn-buscar-filme');
  const container = document.getElementById('lista-filmes');

  // Busca inicial padrão ao carregar a página
  executarBusca('movie');

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
    container.innerHTML = `<p class="mensagem">Carregando filmes da API...</p>`;

    try {
      const filmes = await buscarMidiaAPI(termo);

      if (filmes.length === 0) {
        container.innerHTML = `<p class="mensagem">Nenhum resultado encontrado para "${termo}".</p>`;
        return;
      }

      container.innerHTML = filmes.map(f => `
        <div class="card">
          <img src="${f.imagem}" alt="${f.titulo}" class="card__imagem" />
          <h3 class="card__titulo">${f.titulo}</h3>
          <p class="card__info"><strong>Ano:</strong> ${f.ano}</p>
          <p class="card__info"><strong>Nota:</strong> ⭐ ${f.nota}</p>
          <p class="card__info"><strong>Gênero:</strong> ${f.genero}</p>
        </div>
      `).join('');
    } catch (erro) {
      container.innerHTML = `<p class="mensagem mensagem--erro">Falha ao carregar dados da API. Tente novamente.</p>`;
    }
  }
}
