// src/js/paginas/contato.js

async function contato(app) {
  app.innerHTML = `
    <section class="pagina container my-5">
      <div class="mb-5 has-text-centered">
        <h1 class="title is-2 pagina__titulo">Contato</h1>
        <p class="pagina__descricao">Envie uma mensagem e fale com o nosso suporte técnico.</p>
      </div>

      <!-- CORRIGIDO: Columns is-centered centraliza o formulário horizontalmente -->
      <div class="columns is-centered">
        <div class="column is-6">
          <form id="formulario-contato" class="box" style="box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
            <div class="field">
              <label class="label text-muted">Nome:</label>
              <div class="control has-icons-left">
                <input type="text" id="nome" class="input" placeholder="Seu nome completo" required>
                <span class="icon is-small is-left"><i data-lucide="user"></i></span>
              </div>
            </div>

            <div class="field">
              <label class="label text-muted">E-mail:</label>
              <div class="control has-icons-left">
                <input type="email" id="email" class="input" placeholder="seu@email.com" required>
                <span class="icon is-small is-left"><i data-lucide="mail"></i></span>
              </div>
            </div>

            <div class="field">
              <label class="label text-muted">Mensagem:</label>
              <div class="control">
                <textarea id="mensagem" class="textarea" rows="4" placeholder="Escreva sua dúvida ou sugestão aqui..." required></textarea>
              </div>
            </div>

            <button type="submit" class="button is-link is-fullwidth mt-4">
              <span class="icon"><i data-lucide="send-horizontal"></i></span>
              <span>Enviar Mensagem</span>
            </button>
          </form>
          <div id="feedback-contato"></div>
        </div>
      </div>
    </section>
  `;

  ativarFormulario();
}

function ativarFormulario() {
  const form = document.getElementById('formulario-contato');
  const feedback = document.getElementById('feedback-contato');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;

      if (feedback) {
        feedback.innerHTML = `
          <div class="notification is-success is-light mt-4 has-text-centered" style="border-radius: 12px;">
            Obrigado pelo contato, <strong>${nome}</strong>! Sua mensagem foi registrada com sucesso.
          </div>
        `;
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