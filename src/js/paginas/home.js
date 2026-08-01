export function Home() {
  return `
    <section class="pagina pagina--home">
      <h1 class="pagina__titulo">Bem-vindo ao BuscaFilmes SPA</h1>
      <p class="pagina__descricao">Sua plataforma central para explorar os melhores filmes e séries.</p>
      
      <div class="cards-grid">
        <div class="card">
          <h2 class="card__titulo">🎬 Filmes</h2>
          <p class="card__texto">Encontre grandes sucessos do cinema, detalhes e gêneros.</p>
          <a href="#filmes" class="btn">Explorar Filmes</a>
        </div>
        <div class="card">
          <h2 class="card__titulo">📺 Séries</h2>
          <p class="card__texto">Acompanhe suas produções e temporadas favoritas.</p>
          <a href="#series" class="btn">Explorar Séries</a>
        </div>
      </div>
    </section>
  `;
}