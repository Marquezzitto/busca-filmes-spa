export function Contato() {
  return `
    <section class="pagina">
      <h1 class="pagina__titulo">Contato</h1>
      <form id="form-contato" class="form">
        <div class="form__grupo">
          <label for="nome" class="form__label">Nome:</label>
          <input type="text" id="nome" class="input" placeholder="Seu nome" required>
        </div>
        <div class="form__grupo">
          <label for="email" class="form__label">E-mail:</label>
          <input type="email" id="email" class="input" placeholder="Seu e-mail" required>
        </div>
        <div class="form__grupo">
          <label for="mensagem" class="form__label">Mensagem:</label>
          <textarea id="mensagem" class="input input--textarea" rows="4" placeholder="Sua mensagem..." required></textarea>
        </div>
        <button type="submit" class="btn">Enviar</button>
      </form>
      <div id="feedback-contato"></div>
    </section>
  `;
}

export function setupContato() {
  const form = document.getElementById('form-contato');
  const feedback = document.getElementById('feedback-contato');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      if (feedback) {
        feedback.innerHTML = `<p class="feedback-sucesso">Obrigado pelo contato, ${nome}! Sua mensagem foi enviada.</p>`;
      }
      form.reset();
    });
  }
}