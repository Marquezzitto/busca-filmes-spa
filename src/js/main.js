import navbar from "./componentes/navbar/navbar.js";
import roteador from "./componentes/rotas/rotas.js";
import footer from "./componentes/footer/footer.js";

navbar(roteador);
footer();

const app = document.getElementById('app');

const mapaDeRotas = {};
for (const rota of roteador) {
  mapaDeRotas[rota.url] = rota;
}

let hash = window.location.hash || '#home';
render();

window.addEventListener("hashchange", () => {
  hash = window.location.hash;
  render();
});

const rota404 = {
  pagina: async (container) => {
    container.innerHTML = `
      <section class="pagina">
        <h1 class="pagina__titulo">404 - Página Não Encontrada</h1>
        <p class="pagina__descricao">A rota informada não foi localizada.</p>
        <br>
        <a href="#home" class="btn">Voltar ao Início</a>
      </section>
    `;
  }
};

async function render() {
  const rotaAtual = mapaDeRotas[hash] || rota404;
  await rotaAtual.pagina(app);
}