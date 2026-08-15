import buscarMidiaAPI from '../services/api.js';

async function series(app) {
  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Séries</h1>
      <p class="pagina__descricao">Acompanhe suas séries, animes e novelas preferidas.</p>
      <div class="busca-box">
        <input type="text" id="input-serie" class="input" placeholder="Digite a série (ex: Breaking Bad, Dark)...">
        <button id="btn-buscar-serie" class="btn">Buscar</button>
      </div>
      <div id="lista-series" class="bem-grid-auto"></div>
    </section>
  `;

  // Carregamento inicial automático
  executarBusca('drama');
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
  if (!busca) return;

  container.innerHTML = `<p class="mensagem">Buscando séries...</p>`;

  const resultados = await buscarMidiaAPI(busca);

  if (resultados.length === 0) {
    container.innerHTML = `<p class="mensagem">Nenhuma série encontrada para "${busca}".</p>`;
    return;
  }

  container.innerHTML = resultados.map(s => `
    <div class="bem-card">
      <img src="${s.imagem}" alt="${s.titulo}" class="bem-card__image" style="width:100%; height: 280px; object-fit: cover; border-radius:4px; margin-bottom:10px;">
      <h3 class="bem-card__title">${s.titulo}</h3>
      <p><strong>Estreia:</strong> ${s.ano}</p>
      <p><strong>Nota:</strong> ${s.nota}</p>
      <p><strong>Gênero:</strong> ${s.genero}</p>
    </div>
  `).join('');
}

export default {
  url: '#series',
  label: 'Séries',
  pagina: series
};