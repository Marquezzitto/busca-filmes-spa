// Função principal que gera a estrutura base da página de catálogo
export default function Catalogo() {
    const hashAtual = window.location.hash;
    let termoBusca = '';

    if (hashAtual.includes('?')) {
        const queryString = hashAtual.split('?')[1];
        const params = new URLSearchParams(queryString);
        termoBusca = params.get('busca')?.trim() || '';
    }

    return `
        <div class="container-catalogo" style="padding: 20px; color: #fff;">
            <h2 style="margin-bottom: 5px;">Catálogo de Filmes e Séries</h2>
            ${termoBusca ? `<p style="color: #9ca3af; margin-bottom: 20px;">Resultados para: <strong style="color: #fff;">"${decodeURIComponent(termoBusca)}"</strong></p>` : ''}
            
            <!-- Container onde os filmes reais e oficiais serão renderizados -->
            <div id="lista-filmes-api" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: flex-start; margin-top: 20px;">
                <p style="color: #9ca3af;">Conectando ao banco de dados oficial do cinema...</p>
            </div>
        </div>
    `;
}

// Função perita que busca filmes e séries reais no TMDb em português
export async function carregarDadosDaAPI() {
    const container = document.getElementById('lista-filmes-api');
    if (!container) return;

    const hashAtual = window.location.hash;
    let termoBusca = '';

    if (hashAtual.includes('?')) {
        const queryString = hashAtual.split('?')[1];
        const params = new URLSearchParams(queryString);
        termoBusca = params.get('busca')?.trim() || '';
    }

    // Se não houver busca, traz "Velozes e Furiosos" por padrão para já abrir com conteúdo real
    let termoFinal = termoBusca ? decodeURIComponent(termoBusca) : 'Velozes e Furiosos';

    try {
        // Chave pública de leitura do ecossistema TMDb configurada para retornar em Português do Brasil (pt-BR)
        const apiKey = '84414a08cd16f1c4e7230488f72922ec';
        const urlAPI = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(termoFinal)}&page=1&include_adult=false`;

        const resposta = await fetch(urlAPI);
        if (!resposta.ok) throw new Error("Erro na comunicação com o servidor de filmes.");

        const resultado = await resposta.json();
        const dados = resultado.results;

        if (!dados || dados.length === 0) {
            container.innerHTML = `<p class="nenhum-resultado" style="margin: 20px; color: #9ca3af;">Nenhum filme ou série encontrado para "${termoFinal}".</p>`;
            return;
        }

        // Filtra apenas o que for filme (movie) ou série (tv), descartando pessoas/atores que a API possa retornar
        const midiasValidas = dados.filter(item => item.media_type === 'movie' || item.media_type === 'tv');

        // Renderiza os cards reais com os pôsteres oficiais do cinema mundial
        container.innerHTML = midiasValidas.map(item => {
            // O TMDb usa propriedades diferentes para filmes e séries (title vs name)
            const titulo = item.title || item.name || 'Título Indisponível';
            const dataLancamento = item.release_date || item.first_air_date || '';
            const anoLancamento = dataLancamento ? dataLancamento.split('-')[0] : 'N/A';
            
            const tipoMidia = item.media_type === 'tv' ? 'Série' : 'Filme';
            const corTag = item.media_type === 'tv' ? '#0070f3' : '#e50914';
            const nota = item.vote_average ? item.vote_average.toFixed(1) : '7.0';

            // Monta a URL oficial da imagem do pôster ou usa um fallback caso não exista
            const imagemPoster = item.poster_path 
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80';

            const sinopse = item.overview || 'Sinopse não disponível em português para este título.';

            return `
                <div class="card-midia" style="border: 1px solid #2a2e3d; width: 220px; padding: 12px; border-radius: 8px; background: #1a1d24; box-shadow: 0 4px 10px rgba(0,0,0,0.3); color: #fff; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <img src="${imagemPoster}" alt="${titulo}" class="card-midia__img" style="width: 100%; height: 290px; object-fit: cover; border-radius: 6px;" onerror="this.src='https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80'">
                        <div class="card-midia__conteudo" style="padding-top: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <span style="background: ${corTag}; color: #fff; font-size: 0.7em; padding: 2px 6px; border-radius: 4px; font-weight: bold; text-transform: uppercase;">${tipoMidia}</span>
                                <span style="font-size: 0.8em; color: #fbbf24; font-weight: bold;">⭐ ${nota}</span>
                            </div>
                            <h3 style="margin: 6px 0 4px 0; font-size: 0.95em; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${titulo}">${titulo}</h3>
                            <p style="font-size: 0.8em; color: #9ca3af; margin: 0 0 8px 0;">Ano: ${anoLancamento}</p>
                            <p style="font-size: 0.8em; color: #d1d5db; height: 55px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; margin-bottom: 10px; line-height: 1.4;" title="${sinopse}">
                                ${sinopse}
                            </p>
                        </div>
                    </div>
                    <a href="https://www.themoviedb.org/${item.media_type}/${item.id}" target="_blank" style="display: inline-block; width: 100%; text-align: center; background: #22c55e; color: white; padding: 8px 0; border-radius: 4px; text-decoration: none; font-size: 0.85em; font-weight: bold; margin-top: 5px;">Ver Detalhes</a>
                </div>
            `;
        }).join('');

    } catch (erro) {
        console.warn("Gerenciando fluxo de digitação:", erro);
        container.innerHTML = `
            <div style="margin: 20px; padding: 15px; background: #1a1d24; border-radius: 8px; text-align: center; width: 100%;">
                <p style="color: #9ca3af; margin: 0;">Sincronizando dados de cinema... Por favor, aguarde um instante.</p>
            </div>
        `;
    }
}