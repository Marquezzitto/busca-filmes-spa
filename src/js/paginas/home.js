function home() {
    return `
        <!-- 1. BANNER PRINCIPAL (HERO) SEM BARRA DE PESQUISA INTERNA -->
        <div class="bem-card bem-p-xl bem-mb-xl bem-border-top-primary" style="background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: var(--bem-radius-lg);">
            <h1 class="bem-text-3xl bem-text-primary bem-font-bold">Bem-vindo ao CineBusca 🎬</h1>
            <p class="bem-mt-md bem-text-muted-util bem-text-md" style="max-width: 600px; line-height: 1.6;">
                A sua nova experiência em Single Page Application para exploração audiovisual. 
                Encontre de forma instantânea os maiores sucessos do cinema e da TV mundial.
            </p>
            <div class="bem-mt-xl">
                <a href="#catalogo" class="bem-btn bem-btn--primary bem-btn--lg">Explorar Catálogo</a>
            </div>
        </div>

        <!-- 2. SEÇÃO DE RECURSOS (GRID) -->
        <h2 class="bem-mb-sm bem-text-secondary">Por que escolher o CineBusca?</h2>
        <div class="bem-grid-auto bem-mb-xl">
            
            <div class="bem-card bem-p-md">
                <div class="bem-text-2xl bem-mb-sm">⚡</div>
                <h3 class="bem-card__title bem-text-md">Navegação SPA</h3>
                <p class="bem-text-muted-util bem-text-xs bem-mt-xs">Troca de páginas instantânea e sem recarregamento do navegador.</p>
            </div>

            <div class="bem-card bem-p-md">
                <div class="bem-text-2xl bem-mb-sm">📱</div>
                <h3 class="bem-card__title bem-text-md">Totalmente Responsivo</h3>
                <p class="bem-text-muted-util bem-text-xs bem-mt-xs">Interface adaptável para computadores, tablets ou dispositivos móveis.</p>
            </div>

            <div class="bem-card bem-p-md">
                <div class="bem-text-2xl bem-mb-sm">🎨</div>
                <h3 class="bem-card__title bem-text-md">Design Moderno</h3>
                <p class="bem-text-muted-util bem-text-xs bem-mt-xs">Interface construída sobre um tema noturno otimizado para o consumo de vídeos.</p>
            </div>

        </div>

        <!-- 3. BANNER DE AVISO / STATUS -->
        <div class="bem-alert bem-alert--info bem-mb-lg">
            <div class="bem-alert__content">
                <p class="bem-alert__title">💡 Estrutura Pronta</p>
                <p class="bem-alert__message">A interface global do cabeçalho agora abriga o campo de busca fixo. Pronto para a lógica de linkagem dinâmica da próxima aula.</p>
            </div>
        </div>
    `;
}

export default home;