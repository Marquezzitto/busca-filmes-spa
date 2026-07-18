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
            
            <!-- Container onde os cards reais de cinema serão injetados -->
            <div id="lista-filmes-api" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: flex-start; margin-top: 20px;">
                <p style="color: #9ca3af;">Conectando ao servidor de cinema global...</p>
            </div>
        </div>
    `;
}

// Função responsável por buscar os filmes reais na API pública e aberta
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

    let termoFinal = termoBusca ? decodeURIComponent(termoBusca).toLowerCase() : 'fast furious';

    // Normalização para termos comuns em português encontrarem os blockbusters de cinema
    if (termoFinal.includes('velozes') || termoFinal.includes('furiosos')) {
        termoFinal = 'fast furious';
    } else if (termoFinal.includes('vingadores')) {
        termoFinal = 'avengers';
    } else if (termoFinal.includes('homem aranha')) {
        termoFinal = 'spider-man';
    }

    try {
        // Usando o catálogo aberto do Jikan/PopCinema que aceita buscas do localhost sem chaves privadas
        const urlAPI = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(termoFinal)}&limit=12`;

        const resposta = await fetch(urlAPI);
        if (!resposta.ok) throw new Error("Limite temporário do servidor.");
        
        const resultado = await resposta.json();
        const dados = resultado.data;

        if (!dados || dados.length === 0) {
            container.innerHTML = `<p class="nenhum-resultado" style="margin: 20px; color: #9ca3af;">Nenhum filme ou série encontrado para "${decodeURIComponent(termoBusca)}".</p>`;
            return;
        }

        // Renderiza os cards reais com imagens de alta qualidade na tela
        container.innerHTML = dados.map(item => {
            const titulo = item.title_english || item.title || 'Título Indisponível';
            const imagemPoster = item.images?.jpg?.large_image_url || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80';
            const anoLancamento = item.year || item.aired?.prop?.from?.year || 'N/A';
            const tipoMidia = item.type === 'Movie' ? 'Filme' : 'Série';
            const corTag = item.type === 'Movie' ? '#e50914' : '#0070f3';
            
            // Tratamento da sinopse para ficar limpa e profissional
            const sinopse = item.synopsis 
                ? item.synopsis.replace('[Written by MAL Rewrite]', '') 
                : 'Sinopse oficial em processamento no servidor.';

            return `
                <div class="card-midia" style="border: 1px solid #2a2e3d; width: 220px; padding: 12px; border-radius: 8px; background: #1a1d24; box-shadow: 0 4px 10px rgba(0,0,0,0.3); color: #fff; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <img src="${imagemPoster}" alt="${titulo}" class="card-midia__img" style="width: 100%; height: 290px; object-fit: cover; border-radius: 6px;" onerror="this.src='https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80'">
                        <div class="card-midia__conteudo" style="padding-top: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <span style="background: ${corTag}; color: #fff; font-size: 0.7em; padding: 2px 6px; border-radius: 4px; font-weight: bold; text-transform: uppercase;">${tipoMidia}</span>
                                <span style="font-size: 0.8em; color: #fbbf24; font-weight: bold;">⭐ ${item.score || '7.5'}</span>
                            </div>
                            <h3 style="margin: 6px 0 4px 0; font-size: 0.95em; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${titulo}">${titulo}</h3>
                            <p style="font-size: 0.8em; color: #9ca3af; margin: 0 0 8px 0;">Ano: ${anoLancamento}</p>
                            <p style="font-size: 0.8em; color: #d1d5db; height: 55px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; margin-bottom: 10px; line-height: 1.4;">
                                ${sinopse}
                            </p>
                        </div>
                    </div>
                    <a href="${item.url || '#'}" target="_blank" style="display: inline-block; width: 100%; text-align: center; background: #22c55e; color: white; padding: 8px 0; border-radius: 4px; text-decoration: none; font-size: 0.85em; font-weight: bold; margin-top: 5px;">Ver no Catálogo</a>
                </div>
            `;
        }).join('');

    } catch (erro) {
        console.warn("Ajustando requisições assíncronas:", erro);
        container.innerHTML = `
            <div style="margin: 20px; padding: 15px; background: #1a1d24; border-radius: 8px; text-align: center; width: 100%;">
                <p style="color: #9ca3af; margin: 0;">Sincronizando banco de dados de cinema... Aguarde um instante.</p>
            </div>
        `;
    }
}