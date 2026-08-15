// src/js/services/ollama.js

const OLLAMA_URL = 'http://10.136.43.122:11434/api/chat';

/**
 * Envia o histórico completo de conversas para a IA no servidor do professor
 * @param {Array} historicoCompleto - Array contendo mensagens anteriores [{role, content}]
 * @returns {Promise<string>}
 */
export async function perguntarOllama(historicoCompleto) {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemma4', // Modelo solicitado pelo seu professor
        messages: [
          { 
            role: 'system', 
            content: 'Você é um assistente virtual especialista em cinema, filmes, séries e tradução para o BuscaFilmes SPA. Responda de forma direta, amigável e sempre em português.' 
          },
          ...historicoCompleto
        ],
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error("Erro de conexão");
    }

    const data = await response.json();
    return data.message.content; // Retorna a resposta do chat formatada do Ollama

  } catch (error) {
    console.warn("Servidor Ollama indisponível. Executando contingência offline.");
    
    // Retorna uma simulação inteligente baseada no último input do usuário
    const ultimaMensagem = historicoCompleto[historicoCompleto.length - 1].content.toLowerCase();

    if (ultimaMensagem.includes('olá') || ultimaMensagem.includes('oi')) {
      return "Olá! Sou o assistente de IA. Como o servidor local do professor está inacessível no momento, estou operando de forma offline. Pergunte sobre filmes ou séries!";
    }
    if (ultimaMensagem.includes('filme') || ultimaMensagem.includes('indica') || ultimaMensagem.includes('sugere')) {
      return "Ótima pergunta! Recomendo ver clássicos como 'Inception' ou 'Interstellar'. Acesse o nosso catálogo de Filmes no menu para pesquisar em tempo real!";
    }
    if (ultimaMensagem.includes('como funciona') || ultimaMensagem.includes('spa')) {
      return "Esta aplicação é uma SPA feita em Vanilla JS! Ela gerencia rotas dinâmicas por hashchange e consome APIs externas sem recarregar o navegador.";
    }
    
    return `Entendi a sua dúvida sobre cinema. Atualmente, o servidor do professor (IP 10.136.43.122) está offline, impedindo o processamento de respostas complexas. Use as abas de busca do site para ver dados técnicos reais!`;
  }
}