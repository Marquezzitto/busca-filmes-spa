function filmes() {
    return `
        <h1 class="bem-mb-md bem-text-primary">Filmes</h1>
        
        <h2 class="bem-mt-lg bem-mb-sm bem-text-secondary"> Filmes em Destaque</h2>
        <div class="bem-grid-auto bem-mb-xl">
            
            <div class="bem-card">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="https://image.tmdb.org/t/p/w500/lh48zAsbL8vL6U696W6X636V61m.jpg" alt="Matrix" style="height: 280px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff; color: #fff;">14</span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">Matrix</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm">Um programador descobre que a realidade é uma simulação criada por máquinas.</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">1999 • Ficção</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm">Ver mais</button>
                </div>
            </div>

            <div class="bem-card">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="https://image.tmdb.org/t/p/w500/9gk7adHYN3NmIn7mN7Z1wJuEk42.jpg" alt="A Origem" style="height: 280px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff; color: #fff;">14</span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">A Origem</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm">Um thief que invade os sonhos das pessoas para roubar segredos corporativos.</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">2010 • Ficção</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm">Ver mais</button>
                </div>
            </div>

        </div>

        <h2 class="bem-mt-lg bem-mb-sm bem-text-secondary"> Lançamentos</h2>
        <div class="bem-grid-auto bem-mb-xl">
            
            <div class="bem-card">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="https://image.tmdb.org/t/p/w500/czb7jN4U86g66wK86RI9bEg6Bhb.jpg" alt="Duna 2" style="height: 280px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff; color: #fff;">14</span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">Duna: Parte Dois</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm">Paul Atreides se une aos Fremen para buscar vingança contra os conspiradores.</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">2024 • Ação</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm">Ver mais</button>
                </div>
            </div>

        </div>
    `;
}

function inicializarFilmes() {}

export { filmes, inicializarFilmes };