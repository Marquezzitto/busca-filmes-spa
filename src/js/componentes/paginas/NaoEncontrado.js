// src/js/paginas/NaoEncontrado.js

async function NaoEncontrado(app) {
  app.innerHTML = `
    <section class="pagina container my-6 has-text-centered">
      <div class="py-6">
        <h1 class="title is-1 has-text-danger mb-4">404</h1>
        <h2 class="title is-3 mb-2">Página Não Encontrada</h2>
        <p class="subtitle is-5 text-muted mb-5">O caminho ou endereço informado não foi localizado na nossa SPA.</p>
        <a href="#home" class="button is-link">
          <span class="icon"><i data-lucide="home"></i></span>
          <span>Voltar ao Início</span>
        </a>
      </div>
    </section>
  `;
}

export default {
  url: '#404',
  label: '404',
  pagina: NaoEncontrado
};