const seriesData = [
  { id: 1, titulo: 'Stranger Things', temporadas: '4', genero: 'Ficção / Mistério', icone: '📺', nota: '8.7' },
  { id: 2, titulo: 'Breaking Bad', temporadas: '5', genero: 'Drama / Crime', icone: '🧪', nota: '9.5' },
  { id: 3, titulo: 'The Crown', temporadas: '6', genero: 'Drama Histórico', icone: '👑', nota: '8.6' },
  { id: 4, titulo: 'Dark', temporadas: '3', genero: 'Ficção / Suspense', icone: '⏳', nota: '8.7' },
  { id: 5, titulo: 'The Office', temporadas: '9', genero: 'Comédia', icone: '💼', nota: '9.0' },
  { id: 6, titulo: 'Game of Thrones', temporadas: '8', genero: 'Fantasia / Drama', icone: '🐉', nota: '9.2' }
];

async function series(app) {
  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Séries</h1>
      <div class="busca-box">
        <input type="text" id="input-serie" class="input" placeholder="Buscar série por título...">
        <button id="btn-buscar-serie" class="btn">Buscar</button>
      </div>
      <div id="lista-series" class="bem-grid-auto"></div>
    </section>
  `;

  renderizarLista(seriesData);
  ativarBusca();
}

function renderizarLista(lista) {
  const container = document.getElementById('lista-series');
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = `<p class="mensagem">Nenhuma série encontrada.</p>`;
    return;
  }

  container.innerHTML = lista.map(s => `
    <div class="bem-card">
      <div class="bem-card__icone">${s.icone}</div>
      <h3 class="bem-card__title">${s.titulo}</h3>
      <p><strong>Temporadas:</strong> ${s.temporadas}</p>
      <p><strong>Nota:</strong> ⭐ ${s.nota}</p>
      <p><strong>Gênero:</strong> ${s.genero}</p>
    </div>
  `).join('');
}

function ativarBusca() {
  const input = document.getElementById('input-serie');
  const btn = document.getElementById('btn-buscar-serie');

  if (input && btn) {
    const executarFiltro = () => {
      const termo = input.value.toLowerCase().trim();
      const filtrados = seriesData.filter(s => s.titulo.toLowerCase().includes(termo));
      renderizarLista(filtrados);
    };

    btn.addEventListener('click', executarFiltro);
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') executarFiltro();
    });
  }
}

export default {
  url: '#series',
  label: 'Séries',
  pagina: series
};