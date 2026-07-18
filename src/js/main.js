import rotas from "./componentes/rotas/rotas.js"; 
import navbar from "./componentes/navbar/navbar.js";
import { carregarDadosDaAPI } from "./paginas/catalogo.js"; 

// Inicializa a barra de navegação global
navbar(rotas);

const app = document.getElementById('app');
const mapaDeRotas = {};

// Mapeia todas as rotas cadastradas para busca rápida
for (const rota of rotas) {
    mapaDeRotas[rota.url] = rota;
}

// Rota padrão para páginas não encontradas (404)
const rota404 = { 
    pagina: () => '<div class="bem-alert bem-alert--danger">Página não encontrada 404</div>' 
};

// Captura a hash inicial da URL ou define a Home (#inicio) como padrão
let hash = window.location.hash || '#inicio';

// Primeira renderização ao carregar o site
render();

// Monitora quando o usuário muda de página ou faz uma busca
window.addEventListener("hashchange", () => {
    hash = window.location.hash || '#inicio';
    render();
});

function render() {
    // Separa a rota dos parâmetros de busca (ex: '#catalogo?busca=marvel' vira '#catalogo')
    const hashLimpa = hash.split('?')[0]; 
    
    // Busca a página correspondente no mapa de rotas
    const rotaAtual = mapaDeRotas[hashLimpa] || rota404;
    
    // Injeta o HTML base da página na tela
    app.innerHTML = rotaAtual.pagina();
    
    // Executa funções adicionais da rota se existirem
    if (rotaAtual.acao && typeof rotaAtual.acao === 'function') {
        rotaAtual.acao();
    }

    // Se for a rota do catálogo, dispara a busca na API imediatamente
    if (hashLimpa === '#catalogo') {
        carregarDadosDaAPI().catch(erro => {
            console.error("Erro ao executar a API:", erro);
            const container = document.getElementById('lista-filmes-api');
            if (container) {
                container.innerHTML = `<p style="color: red;">Erro crítico ao carregar dados: ${erro.message}</p>`;
            }
        });
    }
}