// src/js/componentes/chatbot/chatbot.js
import { perguntarOllama } from '../services/ollama.js';

export function inicializarChatbot() {  
  const container = document.getElementById('chatbot');
  if (!container) return;  

  // Renderiza a estrutura do Widget e da Janela de Chat
  container.innerHTML = `
    <div class="chatbot-container">
      <!-- Botão Pulsante -->      
      <button id="chatbot-trigger" class="chatbot-trigger pulse-animation">
        <i data-lucide="bot" style="width: 28px; height: 28px;"></i>
      </button> 
      
      <!-- Janela do Chat -->      
      <div id="chatbot-window" class="chatbot-window is-hidden">
        <header class="chatbot-header">          
          <h3><i data-lucide="bot"></i> Assistente AI (Gemma4)</h3>
          <button id="chatbot-close-btn" class="delete" aria-label="close"></button>
        </header>
        <div id="chatbot-messages" class="chatbot-messages"></div>
        <div class="chatbot-footer">
          <input type="text" id="chatbot-input" class="input is-rounded" placeholder="Pergunte ou peça tradução...">          
          <button id="chatbot-send" class="button is-link is-rounded">
            <i data-lucide="send-horizontal"></i>
          </button>        
        </div>      
      </div>    
    </div>
  `;  

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();  
  }  

  // Elementos DOM 
  const trigger = document.getElementById('chatbot-trigger');
  const windowElement = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const messagesBox = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');

  // Recupera ou cria histórico no LocalStorage (Memória Persistente)
  let historico = JSON.parse(localStorage.getItem('busca_filmes_chat_history')) || [
    { role: 'assistant', content: 'Olá! Sou seu assistente de cinema. Pergunte-me sobre filmes, séries ou solicite alguma tradução!' }
  ];  

  // Renderiza mensagens salvas ao iniciar
  const renderizarMensagens = () => {
    messagesBox.innerHTML = historico.map(msg => `
      <div class="chat-bubble ${msg.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}">
        ${msg.content}    
      </div>   
    `).join('');   
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }; 

  // Abre e fecha a janela  
  trigger.addEventListener('click', () => {  
    windowElement.classList.toggle('is-hidden');    
    messagesBox.scrollTop = messagesBox.scrollHeight;  
  });  

  closeBtn.addEventListener('click', () => {
    windowElement.classList.add('is-hidden');  
  });  

  // Envio de Mensagem
  const enviarMensagem = async () => {    
    const texto = input.value.trim();    
    if (!texto) return;   

    // Adiciona o usuário ao histórico e renderiza    
    historico.push({ role: 'user', content: texto });
    localStorage.setItem('busca_filmes_chat_history', JSON.stringify(historico));
    renderizarMensagens();    
    input.value = '';   

    // Balão de "Pensando..."
    const loadingId = 'loading-' + Date.now();    
    messagesBox.innerHTML += `
      <div id="${loadingId}" class="chat-bubble chat-bubble--bot text-muted">
        <i data-lucide="loader" class="spinner" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>       
        Pensando... 
      </div>   
    `;    
    if (typeof lucide !== 'undefined') lucide.createIcons();    
    messagesBox.scrollTop = messagesBox.scrollHeight;   

    // 🌟 INJEÇÃO DA REGRA DE TÓPICOS: Enviamos a instrução de sistema no topo da requisição
    const instrucaoSistema = {
      role: 'system',
      content: 'Você é o assistente virtual do PrimeCine. Sempre responda em português, de forma amigável e OBRIGATORIAMENTE estruturada em tópicos curtos e claros (utilizando hífens "-" ou números para cada ponto).'
    };

    // Mescla a instrução temporária com o histórico real
    const historicoComInstrucao = [instrucaoSistema, ...historico];

    try {
      // Envia o histórico com a instrução de sistema para dar contexto à IA  
      const resposta = await perguntarOllama(historicoComInstrucao);  
      
      // Remove balão de carregando   
      const loadingBubble = document.getElementById(loadingId);  
      if (loadingBubble) loadingBubble.remove();

      // Adiciona apenas a resposta real no histórico oficial do usuário
      historico.push({ role: 'assistant', content: resposta });
      localStorage.setItem('busca_filmes_chat_history', JSON.stringify(historico));
      renderizarMensagens();
    } catch (error) {
      console.error("Erro na comunicação com a IA:", error);
      const loadingBubble = document.getElementById(loadingId);  
      if (loadingBubble) loadingBubble.remove();
      
      historico.push({ role: 'assistant', content: 'Desculpe, não consegui obter resposta dos meus servidores de Inteligência Artificial no momento.' });
      renderizarMensagens();
    }
  };

  // Event Listeners de Envio
  sendBtn.addEventListener('click', enviarMensagem);
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') enviarMensagem();
  });

  // Renderiza o chat com as mensagens existentes ao carregar
  renderizarMensagens();
}

export default inicializarChatbot;