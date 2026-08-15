const BASE_URL = 'https://api.tvmaze.com';

/**
 * Consome a API pública TVMaze para buscar títulos em tempo real
 * @param {string} query 
 * @returns {Promise<Array>}
 */
async function buscarMidiaAPI(query) {
  if (!query) return [];

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    
    return data.map(item => ({
      id: item.show.id,
      titulo: item.show.name,
      ano: item.show.premiered ? item.show.premiered.split('-')[0] : 'N/A',
      genero: item.show.genres && item.show.genres.length > 0 ? item.show.genres.join(', ') : 'Gênero não informado',
      nota: item.show.rating && item.show.rating.average ? `⭐ ${item.show.rating.average}` : 'N/A',
      imagem: item.show.image ? item.show.image.medium : 'https://via.placeholder.com/210x295?text=Sem+Imagem',
    }));
  } catch (error) {
    console.error('Erro de conexão com a API de filmes:', error);
    return [];
  }
}

export default buscarMidiaAPI;
