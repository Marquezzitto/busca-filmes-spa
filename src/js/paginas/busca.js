const catalogoFilmes = [
    { titulo: 'Matrix', tipo: 'Filme', ano: 1999, genero: 'Ficção', imagem: 'https://image.tmdb.org/t/p/w500/lh48zAsbL8vL6U696W6X636V61m.jpg' },
    { titulo: 'Breaking Bad', tipo: 'Série', ano: 2008, genero: 'Drama', imagem: 'https://image.tmdb.org/t/p/w500/ztwSg891Vb4L0UbyvclB6OAsvN7.jpg' },
    { titulo: 'Interstellar', tipo: 'Filme', ano: 2014, genero: 'Ficção', imagem: 'https://image.tmdb.org/t/p/w500/gEU2vYvS9MvVJ6f3TxYvAsH4j02.jpg' },
    { titulo: 'Stranger Things', tipo: 'Série', ano: 2016, genero: 'Suspense', imagem: 'https://image.tmdb.org/t/p/w500/x26Y3YLeO0wIO7pol8JJbZ80U3R.jpg' }
];

function busca() {
    return `
        <h1 class="bem-mb-md bem-text-primary">Descobrir Produções</h1>
        <div class="bem-grid-auto" id="container-cards-filmes"></div>
    `;
}

function inicializarBuscaFilmes() {
    const container = document.getElementById('container-cards-filmes');
    if (!container) return;

    let htmlGerado = "";

    for (let i = 0; i < catalogoFilmes.length; i++) {
        const item = catalogoFilmes[i];
        htmlGerado += `
            <div class="bem-card bem-animate-fade-in">
                <img class="bem-card__image" src="${item.imagem}" alt="${item.titulo}" style="height: 320px; object-fit: cover;">
                <div class="bem-card__body">
                    <h3 class="bem-card__title">${item.titulo}</h3>
                    <p class="bem-text-muted-util bem-text-sm">${item.tipo} • ${item.genero}</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center">
                    <span class="bem-text-xs bem-text-muted-util">Ano: ${item.ano}</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm">Assistir</button>
                </div>
            </div>
        `;
    }

    container.innerHTML = htmlGerado;
}

export { busca, inicializarBuscaFilmes };