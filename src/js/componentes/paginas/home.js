async function home(app) {
  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Bem-vindo ao BuscaFilmes SPA</h1>
      <p class="pagina__descricao">Sua plataforma para explorar filmes e séries em tempo real.</p>

      <div class="bem-grid-auto">
        <div class="bem-card">
          <div class="bem-card__icone">🎬</div>
          <h2 class="bem-card__title">Filmes</h2>
          <p>Confira grandes produções e clássicos mundiais.</p>
          <br>
          <a href="#filmes" class="btn">Ver Filmes</a>
        </div>
        <div class="bem-card">
          <div class="bem-card__icone">📺</div>
          <h2 class="bem-card__title">Séries</h2>
          <p>Descubra séries de TV, animes e muito mais.</p>
          <br>
          <a href="#series" class="btn">Ver Séries</a>
        </div>
      </div>
    </section>
  `;
}

export default {
  url: '#home',
  label: 'Home',
  pagina: home
};
