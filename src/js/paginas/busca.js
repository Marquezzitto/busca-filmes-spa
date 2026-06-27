function gerarCatalogoCompleto() {
    const lista = [];
    const generos = ["Ação", "Comédia", "Drama", "Ficção", "Terror", "Suspense", "Romance", "Animação", "Documentário", "Fantasia"];
    const idades = ["L", "12", "14", "16", "18"];
    const tipos = ["Filme", "Série"];
    
    for (let i = 1; i <= 100; i++) {
        let tipoAtual = tipos[i % 2];
        let generoAtual = generos[i % generos.length];
        let idadeAtual = idades[i % idades.length];
        let anoAtual = 2020 + (i % 7);
        
        let destaque = (i % 3 === 0);
        let lancamento = (anoAtual === 2026);

        lista.push({
            id: i,
            titulo: `${tipoAtual} de ${generoAtual} ${i}`,
            tipo: tipoAtual,
            genero: generoAtual,
            ano: anoAtual,
            classificacao: idadeAtual,
            sinopse: `Esta é a sinopse detalhada da produção número ${i}. Um conteúdo incrível sobre ${generoAtual} feito para testar o nosso sistema.`,
            imagem: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
            isDestaque: destaque,
            isLancamento: lancamento
        });
    }
    return lista;
}

const catalogoFilmes = gerarCatalogoCompleto();

function busca() {
    return `
        <h1 class="bem-mb-md bem-text-primary">Catálogo Completo</h1>
        
        <div class="bem-form__group bem-mb-xl">
            <input type="text" id="inputPesquisaFilme" placeholder="Digite para buscar em todo o catálogo..." class="bem-form__input">
        </div>

        <div id="interface-catalogo"></div>
    `;
}

function inicializarBuscaFilmes() {
    const input = document.getElementById('inputPesquisaFilme');
    
    renderizarVitrinesOrganizadas(catalogoFilmes);

    if (input) {
        input.addEventListener('keyup', (event) => {
            const termo = event.target.value.toLowerCase();
            
            if (termo.length > 0) {
                const filtrados = [];
                for (let i = 0; i < catalogoFilmes.length; i++) {
                    if (catalogoFilmes[i].titulo.toLowerCase().includes(termo) || 
                        catalogoFilmes[i].genero.toLowerCase().includes(termo) ||
                        catalogoFilmes[i].tipo.toLowerCase().includes(termo)) {
                        filtrados.push(catalogoFilmes[i]);
                    }
                }
                renderizarListaSimples(filtrados);
            } else {
                renderizarVitrinesOrganizadas(catalogoFilmes);
            }
        });
    }
}

function renderizarVitrinesOrganizadas(lista) {
    const container = document.getElementById('interface-catalogo');
    if (!container) return;

    let filmesDestaque = [];
    let filmesLancamento = [];
    let seriesDestaque = [];
    let seriesLancamento = [];
    
    let prateleirasGeneros = {
        "Ação": [], "Comédia": [], "Drama": [], "Ficção": [], "Terror": [],
        "Suspense": [], "Romance": [], "Animação": [], "Documentário": [], "Fantasia": []
    };

    for (let i = 0; i < lista.length; i++) {
        const item = lista[i];

        if (item.tipo === "Filme") {
            if (item.isDestaque) filmesDestaque.push(item);
            if (item.isLancamento) filmesLancamento.push(item);
        } else if (item.tipo === "Série") {
            if (item.isDestaque) seriesDestaque.push(item);
            if (item.isLancamento) seriesLancamento.push(item);
        }

        if (prateleirasGeneros[item.genero] !== undefined) {
            prateleirasGeneros[item.genero].push(item);
        }
    }

    let htmlFinal = "";
    
    htmlFinal += criarPrateleiraVisual("🎬 Filmes em Destaque", filmesDestaque);
    htmlFinal += criarPrateleiraVisual("🚀 Lançamentos em Filmes (2026)", filmesLancamento);
    htmlFinal += criarPrateleiraVisual("📺 Séries em Destaque", seriesDestaque);
    htmlFinal += criarPrateleiraVisual("✨ Lançamentos em Séries (2026)", seriesLancamento);
    
    const nomesGeneros = Object.keys(prateleirasGeneros);
    for (let i = 0; i < nomesGeneros.length; i++) {
        let nomeGen = nomesGeneros[i];
        htmlFinal += criarPrateleiraVisual(`💥 Produções de ${nomeGen}`, prateleirasGeneros[nomeGen]);
    }

    container.innerHTML = htmlFinal;
}

function criarPrateleiraVisual(tituloSecao, itens) {
    if (itens.length === 0) return "";

    let html = `<h2 class="bem-mt-lg bem-mb-sm bem-text-secondary">${tituloSecao}</h2>`;
    html += `<div class="bem-grid-auto bem-mb-xl">`;

    let limite = itens.length > 4 ? 4 : itens.length;
    
    for (let i = 0; i < limite; i++) {
        const item = itens[i];
        html += `
            <div class="bem-card bem-animate-fade-in">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="${item.imagem}" alt="${item.titulo}" style="height: 180px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff;">
                        ${item.classificacao}
                    </span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">${item.titulo}</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        ${item.sinopse}
                    </p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">${item.ano} • ${item.genero}</span>
                    <button class="bem-btn bem-btn--primary bem-btn--sm" onclick="alert('Buscando produções semelhantes do gênero ${item.genero}...')">Ver mais</button>
                </div>
            </div>
        `;
    }

    html += `</div>`;
    return html;
}

function renderizarListaSimples(filtrados) {
    const container = document.getElementById('interface-catalogo');
    if (!container) return;

    if (filtrados.length === 0) {
        container.innerHTML = `<div class="bem-alert bem-alert--warning bem-w-full"><p class="bem-alert__message">Nenhum resultado encontrado.</p></div>`;
        return;
    }

    let html = `<h2 class="bem-mb-sm">Resultados da Pesquisa</h2><div class="bem-grid-auto">`;
    for (let i = 0; i < filtrados.length; i++) {
        const item = filtrados[i];
        html += `
            <div class="bem-card bem-animate-fade-in">
                <div class="bem-p-sm" style="position: relative;">
                    <img class="bem-card__image" src="${item.imagem}" alt="${item.titulo}" style="height: 180px; object-fit: cover; border-radius: var(--bem-radius-md);">
                    <span class="bem-text-xs bem-font-bold bem-p-sm bem-rounded" style="position: absolute; top: 15px; right: 15px; background: #000; border: 1px solid #fff;">${item.classificacao}</span>
                </div>
                <div class="bem-card__body bem-p-sm">
                    <h3 class="bem-card__title bem-text-sm">${item.titulo}</h3>
                    <p class="bem-text-muted-util bem-text-xs bem-mt-sm">${item.sinopse}</p>
                </div>
                <div class="bem-card__footer bem-flex bem-justify-between bem-items-center bem-p-sm">
                    <span class="bem-text-xs bem-text-muted-util">${item.ano} • ${item.genero}</span>
                </div>
            </div>
        `;
    }
    html += `</div>`;
    container.innerHTML = html;
}

export { busca, inicializarBuscaFilmes };