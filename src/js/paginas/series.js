function series() {
    return `
        <h1 class="bem-mb-md bem-text-primary">Séries</h1>
        
        <h2 class="bem-mt-lg bem-mb-sm bem-text-secondary"> Séries em Destaque</h2>
        <div class="bem-grid-auto bem-mb-xl">
            
            <div class="bem-card">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="https://image.tmdb.org/t/p/w500/ztwSg891Vb4L0UbyvclB6OAsvN7.jpg" alt="Breaking Bad" style="height: 280px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff; color: #fff;">16</span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">Breaking Bad</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm">Um professor de química se volta para o crime após descobrir uma doença fatal.</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">2008 • Drama</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm">Ver mais</button>
                </div>
            </div>

            <div class="bem-card">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="https://image.tmdb.org/t/p/w500/x26Y3YLeO0wIO7pol8JJbZ80U3R.jpg" alt="Stranger Things" style="height: 280px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff; color: #fff;">16</span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">Stranger Things</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm">Garotos enfrentam mistérios governamentais e forças sobrenaturais na cidade.</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">2016 • Ficção</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm">Ver mais</button>
                </div>
            </div>

        </div>

        <h2 class="bem-mt-lg bem-mb-sm bem-text-secondary"> Lançamentos</h2>
        <div class="bem-grid-auto bem-mb-xl">
            
            <div class="bem-card">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="https://image.tmdb.org/t/p/w500/6968mP96H3C9zO4OToUa9m6L3O0.jpg" alt="Round 6" style="height: 280px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff; color: #fff;">18</span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">Round 6: Temporada 2</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm">Novos jogos mortais aguardam os participantes desesperados por dinheiro.</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">2024 • Suspense</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm">Ver mais</button>
                </div>
            </div>

        </div>
    `;
}

export default series;