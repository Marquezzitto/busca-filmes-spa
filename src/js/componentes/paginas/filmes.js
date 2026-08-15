import buscarMidiaAPI from '../services/api.js';

async function filmes(app) {
  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Filmes</h1>
      <p class="pagina__descricao">Pesquise por títulos de filmes em tempo real através da nossa API.</p>
      <div class="busca-box">
        <input type="text" id="input-filme" class="input" placeholder="Digite o filme (ex: Batman, Matrix)...">
        <button id="btn-buscar-filme" class="btn">Buscar</button>
      </div>
      <div id="lista-filmes" class="bem-grid-auto"></div>
    </section>
  `;

  // Carregamento inicial automático para não abrir a tela vazia
  executarBusca('movie');
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
  if (!busca) return;

  container.innerHTML = `<p class="mensagem">Buscando filmes...</p>`;

  const resultados = await buscarMidiaAPI(busca);

  if (resultados.length === 0) {
    container.innerHTML = `<p class="mensagem">Nenhum filme encontrado para "${busca}".</p>`;
    return;
  }

  container.innerHTML = resultados.map(f => `
    <div class="bem-card">
      <img src="${f.imagem}" alt="${f.titulo}" class="bem-card__image" style="width:100%; height: 280px; object-fit: cover; border-radius:4px; margin-bottom:10px;">
      <h3 class="bem-card__title">${f.titulo}</h3>
      <p><strong>Lançamento:</strong> ${f.ano}</p>
      <p><strong>Nota:</strong> ${f.nota}</p>
      <p><strong>Gênero:</strong> ${f.genero}</p>
    </div>
  `).join('');
}

export default {
  url: '#filmes',
  label: 'Filmes',
  pagina: filmes
};
