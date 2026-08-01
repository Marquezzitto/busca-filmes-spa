const filmesData = [
  { id: 1, titulo: 'Inception', ano: '2010', genero: 'Ficção Científica', icone: '🎬', nota: '8.8' },
  { id: 2, titulo: 'Interstellar', ano: '2014', genero: 'Ficção Científica', icone: '🚀', nota: '8.7' },
  { id: 3, titulo: 'The Dark Knight', ano: '2008', genero: 'Ação / Crime', icone: '🦇', nota: '9.0' },
  { id: 4, titulo: 'Matrix', ano: '1999', genero: 'Ação / Ficção', icone: '🕶️', nota: '8.7' },
  { id: 5, titulo: 'Gladiador', ano: '2000', genero: 'Ação / Drama', icone: '⚔️', nota: '8.5' },
  { id: 6, titulo: 'Avatar', ano: '2009', genero: 'Ficção / Aventura', icone: '🌌', nota: '7.9' }
];

async function filmes(app) {
  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Catálogo de Filmes</h1>
      <div class="busca-box">
        <input type="text" id="input-filme" class="input" placeholder="Buscar filme por título...">
        <button id="btn-buscar-filme" class="btn">Buscar</button>
      </div>
      <div id="lista-filmes" class="bem-grid-auto"></div>
    </section>
  `;

  renderizarLista(filmesData);
  ativarBusca();
}

function renderizarLista(lista) {
  const container = document.getElementById('lista-filmes');
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = `<p class="mensagem">Nenhum filme encontrado.</p>`;
    return;
  }

  container.innerHTML = lista.map(f => `
    <div class="bem-card">
      <div class="bem-card__icone">${f.icone}</div>
      <h3 class="bem-card__title">${f.titulo}</h3>
      <p><strong>Ano:</strong> ${f.ano}</p>
      <p><strong>Nota:</strong> ⭐ ${f.nota}</p>
      <p><strong>Gênero:</strong> ${f.genero}</p>
    </div>
  `).join('');
}

function ativarBusca() {
  const input = document.getElementById('input-filme');
  const btn = document.getElementById('btn-buscar-filme');

  if (input && btn) {
    const executarFiltro = () => {
      const termo = input.value.toLowerCase().trim();
      const filtrados = filmesData.filter(f => f.titulo.toLowerCase().includes(termo));
      renderizarLista(filtrados);
    };

    btn.addEventListener('click', executarFiltro);
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') executarFiltro();
    });
  }
}

export default {
  url: '#filmes',
  label: 'Filmes',
  pagina: filmes
};
