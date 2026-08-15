// src/js/paginas/ajuda.js
import { perguntarOllama } from '../services/ollama.js';

async function ajuda(app) {
  app.innerHTML = `
    <section class="pagina container my-4">
      <h1 class="pagina__titulo d-flex align-items-center gap-2">
        <i data-lucide="bot"></i> Assistente de Ajuda AI
      </h1>
      <p class="pagina__descricao">Tire dúvidas sobre filmes, séries e suporte técnico com a nossa inteligência artificial local (Ollama).</p>

      <div class="chat-container">
        <div id="chat-messages" class="chat-messages d-flex flex-column gap-3 mb-3">
          <div class="chat-bubble chat-bubble--bot">
            Olá! Sou o assistente do BuscaFilmes. Como posso ajudar você no catálogo hoje?
          </div>
        </div>
        <div class="busca-box d-flex gap-2">
          <input type="text" id="input-chat" class="input" placeholder="Pergunte sobre um filme ou tire uma dúvida...">
          <button id="btn-enviar-chat" class="btn">
            <i data-lucide="send-horizontal"></i> Enviar
          </button>
        </div>
      </div>
    </section>
  `;

  ativarChat();
}

function ativarChat() {
  const input = document.getElementById('input-chat');
  const btn = document.getElementById('btn-enviar-chat');
  const messagesContainer = document.getElementById('chat-messages');

  if (input && btn && messagesContainer) {
    const enviarMensagem = async () => {
      const texto = input.value.trim();
      if (!texto) return;

      // Adiciona mensagem do usuário na tela
      messagesContainer.innerHTML += `
        <div class="chat-bubble chat-bubble--user align-self-end">
          ${texto}
        </div>
      `;
      input.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Adiciona balão de "digitando..."
      const digitandoId = "digitando-" + Date.now();
      messagesContainer.innerHTML += `
        <div id="${digitandoId}" class="chat-bubble chat-bubble--bot align-self-start text-muted">
          <i data-lucide="loader" class="spinner"></i> Pensando...
        </div>
      `;
      lucide.createIcons();
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Chama a API do Ollama
      const resposta = await perguntarOllama(texto);

      // Remove o balão de digitando e adiciona a resposta real
      const divDigitando = document.getElementById(digitandoId);
      if (divDigitando) divDigitando.remove();

      messagesContainer.innerHTML += `
        <div class="chat-bubble chat-bubble--bot align-self-start">
          ${resposta}
        </div>
      `;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    btn.addEventListener('click', enviarMensagem);
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') enviarMensagem();
    });
  }
}

export default {
  url: '#ajuda',
  label: 'Ajuda AI',
  pagina: ajuda
};