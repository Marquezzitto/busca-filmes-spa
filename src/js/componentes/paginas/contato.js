async function contato(app) {
  app.innerHTML = `
    <section class="pagina">
      <h1 class="pagina__titulo">Contato</h1>
      <p class="pagina__descricao">Envie uma mensagem para a nossa equipe.</p>
      <form id="formulario-contato" class="form">
        <div class="form__grupo">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" class="input" required>
        </div>
        <div class="form__grupo">
          <label for="email">E-mail:</label>
          <input type="email" id="email" class="input" required>
        </div>
        <div class="form__grupo">
          <label for="mensagem">Mensagem:</label>
          <textarea id="mensagem" class="input" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn">Enviar Mensagem</button>
      </form>
      <div id="feedback-contato"></div>
    </section>
  `;

  ativarFormulario();
}

function activarFormulario() {
  const form = document.getElementById('formulario-contato');
  const feedback = document.getElementById('feedback-contato');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;

      if (feedback) {
        feedback.innerHTML = `<p class="mensagem-sucesso">Obrigado pelo contato, ${nome}! Sua mensagem foi registrada com sucesso.</p>`;
      }
      form.reset();
    });
  }
}

export default {
  url: '#contato',
  label: 'Contato',
  pagina: contato
};
