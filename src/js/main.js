import navbar from "/src/js/componentes/navbar/navbar.js";
import rotas from "/src/js/componentes/rotas/rotas.js";

navbar(rotas);

const app = document.getElementById('app');
const mapaDeRotas = {};

for (const rota of rotas) {
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