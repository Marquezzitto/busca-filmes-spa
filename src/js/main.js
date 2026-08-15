import navbar from "./componentes/navbar/navbar.js";
import roteador from "./componentes/rotas/rotas.js";
import footer from "./componentes/footer/footer.js";
import NaoEncontrado from "./componentes/paginas/NaoEncontrado.js";

// Inicializa os componentes globais
navbar(roteador);
footer();

const app = document.getElementById('app');

// Transforma o array de rotas em um mapa de consulta rápida
const mapaDeRotas = {};
for (const rota of roteador) {
  mapaDeRotas[rota.url] = rota;
}

let hash = window.location.hash || '#home';
render();

// Monitor de alteração de hash da URL (Roteador SPA)
window.addEventListener("hashchange", () => {
  hash = window.location.hash;
  render();
});

async function render() {
  const rotaAtual = mapaDeRotas[hash] || NaoEncontrado;
  await rotaAtual.pagina(app);
}
