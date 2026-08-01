async function NaoEncontrado(app) {
  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">404 - Página Não Encontrada</h1>
      <p class="pagina__descricao">A rota informada não existe.</p>
      <br>
      <a href="#home" class="btn">Voltar ao Início</a>
    </section>
  `;
}

export default {
  url: '#404',
  label: '404',
  pagina: NaoEncontrado
};