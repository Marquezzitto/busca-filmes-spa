import navbar from "./components/navbar/navbar.js";
import roteador from "./components/rotas/rotas.js";

navbar(roteador);

const app = document.getElementById('app');
const mapaDeRotas = {};

for (const rota of roteador) {
    mapaDeRotas[rota.url] = rota;
}

let hash = window.location.hash || '#inicio';
render();

window.addEventListener("hashchange", () => {
    hash = window.location.hash || '#inicio';
    render();
});

const rota404 = { pagina: () => '<div class="bem-alert bem-alert--danger">Página não encontrada 404</div>' };

function render() {
    const rotaAtual = mapaDeRotas[hash] || rota404;
    app.innerHTML = rotaAtual.pagina();
    
    if (rotaAtual.acao && typeof rotaAtual.acao === 'function') {
        rotaAtual.acao();
    }
}