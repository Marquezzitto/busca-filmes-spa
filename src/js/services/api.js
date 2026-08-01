const BASE_URL = 'https://api.tvmaze.com';

/**
 * Busca filmes ou séries na API pelo termo digitado
 * @param {string} query 
 * @returns {Promise<Array>}
 */
export async function buscarMidiaAPI(query) {
  if (!query) return [];

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    
    // Mapeia e padroniza a resposta da API
    return data.map(item => ({
      id: item.show.id,
      titulo: item.show.name,
      ano: item.show.premiered ? item.show.premiered.split('-') : 'N/A',
      genero: item.show.genres.length > 0 ? item.show.genres.join(', ') : 'Gênero não informado',
      nota: item.show.rating?.average || 'N/A',
      imagem: item.show.image?.medium || 'https://via.placeholder.com/210x295?text=Sem+Capa',
      resumo: item.show.summary ? item.show.summary.replace(/<[^>]*>?/gm, '') : 'Sem descrição.'
    }));
  } catch (error) {
    console.error('Erro ao consumir a API:', error);
    throw error;
  }
}
