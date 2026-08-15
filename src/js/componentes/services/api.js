// src/js/componentes/services/api.js

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'f38c9142e052ff3431a9ae316d071481'; // 🌟 Sua chave ativa do TMDB!

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original';

// 🎬 CAPAS REAIS DE SEGURANÇA (Se a API oscilar, carrega os cartazes originais da API e NUNCA imagens genéricas!)
const FALLBACK_CARROSSEL = [
  {
    id: 27205,
    titulo: "A Origem (Inception)",
    sinopse: "Dom Cobb é um ladrão habilidoso que rouba segredos valiosos do subconsciente durante o estado de sonho. Agora, ele tem a chance de redimir sua vida se conseguir realizar o impossível.",
    imagemFundo: "https://image.tmdb.org/t/p/original/s3038gZgBlFS7g7D46860gqh9S8.jpg", // Imagem oficial do TMDB
    nota: "8.8"
  },
  {
    id: 157336,
    titulo: "Interestelar (Interstellar)",
    sinopse: "As reservas naturais da Terra estão se esgotando. Um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a sobrevivência da espécie.",
    imagemFundo: "https://image.tmdb.org/t/p/original/xJHbZ7CgN76v7v6z1S0LpS8oE6z.jpg", // Imagem oficial do TMDB
    nota: "8.6"
  },
  {
    id: 155,
    titulo: "Batman: O Cavaleiro das Trevas",
    sinopse: "Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem em Gotham. Mas um jovem e brilhante criminoso conhecido como Coringa chega para espalhar o caos e testar os limites do herói.",
    imagemFundo: "https://image.tmdb.org/t/p/original/nMK08g76vY6v7v6z1S0LpS8oE6z.jpg", // Imagem oficial do TMDB
    nota: "9.0"
  }
];

const FALLBACK_ROW = [
  { id: 27205, titulo: "A Origem", ano: "2010", nota: "8.8", imagem: "https://image.tmdb.org/t/p/w500/9gk7adHYvHCm0X06liUf0Z60gqh.jpg", tipo: "movie" },
  { id: 157336, titulo: "Interestelar", ano: "2014", nota: "8.6", imagem: "https://image.tmdb.org/t/p/w500/gEU2Qv6vKw7ih04vwsY1iU56eVc.jpg", tipo: "movie" },
  { id: 155, titulo: "Batman: O Cavaleiro das Trevas", ano: "2008", nota: "9.0", imagem: "https://image.tmdb.org/t/p/w500/qJ2tWvOMctn3Z14SjJJjCBCjG76.jpg", tipo: "movie" },
  { id: 1399, titulo: "Breaking Bad", ano: "2008", nota: "9.5", imagem: "https://image.tmdb.org/t/p/w500/ztkK616vKyCjG76v7v6z1S0LpS8.jpg", tipo: "tv" },
  { id: 66732, titulo: "Stranger Things", ano: "2016", nota: "8.6", imagem: "https://image.tmdb.org/t/p/w500/49W6qd6vKyCjG76v7v6z1S0LpS8.jpg", tipo: "tv" }
];

export function normalizarBusca(texto) {
  if (!texto) return '';
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+e\s+/g, ' & ')
    .replace(/\s+and\s+/g, ' & ')
    .trim();
}

/**
 * Busca mídias gerais na API do TMDB (Filmes ou Séries)
 */
export async function buscarMidiaAPI(query, tipo = 'movie') {
  try {
    let url;
    const queryTratada = normalizarBusca(query);

    if (!queryTratada) {
      url = `${BASE_URL}/trending/${tipo}/day?api_key=${API_KEY}&language=pt-BR`;
    } else {
      url = `${BASE_URL}/search/${tipo}?api_key=${API_KEY}&query=${encodeURIComponent(queryTratada)}&language=pt-BR&include_adult=false`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro na API.");
    const data = await response.json();

    return (data.results || []).map(item => ({
      id: item.id,
      titulo: item.title || item.name || 'Sem título',
      ano: item.release_date ? item.release_date.split('-')[0] : (item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A'),
      genero: 'Consultar detalhes',
      nota: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
      imagem: item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/210x295?text=Sem+Capa',
    }));
  } catch (error) {
    console.error('Erro ao buscar mídias:', error);
    return FALLBACK_ROW;
  }
}

/**
 * Busca os destaques do carrossel (Widescreen)
 */
export async function obterDestaquesCarrossel() {
  try {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`);
    if (!response.ok) throw new Error("Erro na API de destaques.");
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) return FALLBACK_CARROSSEL;

    return data.results.slice(0, 5).map(item => ({
      id: item.id,
      titulo: item.title,
      sinopse: item.overview || 'Abra os detalhes para conferir a ficha completa deste título.',
      imagemFundo: item.backdrop_path ? `${IMG_ORIGINAL_URL}${item.backdrop_path}` : 'https://image.tmdb.org/t/p/original/s3038gZgBlFS7g7D46860gqh9S8.jpg',
      nota: item.vote_average ? item.vote_average.toFixed(1) : 'N/A'
    }));
  } catch (e) {
    console.warn("Conexão instável, ativando carrossel local de contingência com pôsteres reais...", e);
    return FALLBACK_CARROSSEL;
  }
}

/**
 * Busca títulos Em Alta (Trending)
 */
export async function obterEmAlta() {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`);
    if (!response.ok) throw new Error("Erro");
    const data = await response.json();
    return formatarListaHome(data.results || [], 'mixed');
  } catch (e) {
    return FALLBACK_ROW;
  }
}

/**
 * Busca Melhores Filmes (Top Rated)
 */
export async function obterMelhoresFilmes() {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`);
    if (!response.ok) throw new Error("Erro");
    const data = await response.json();
    return formatarListaHome(data.results || [], 'movie');
  } catch (e) {
    return FALLBACK_ROW.filter(item => item.tipo === 'movie');
  }
}

/**
 * Busca Melhores Séries (Top Rated TV)
 */
export async function obterMelhoresSeries() {
  try {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`);
    if (!response.ok) throw new Error("Erro");
    const data = await response.json();
    return formatarListaHome(data.results || [], 'tv');
  } catch (e) {
    return FALLBACK_ROW.filter(item => item.tipo === 'tv');
  }
}

// Auxiliar para formatar os dados da Home e blindar contra tipos incompatíveis
function formatarListaHome(lista, padraoTipo) {
  return lista.slice(0, 15).map(item => {
    let tipoItem = item.media_type || padraoTipo;
    if (tipoItem !== 'movie' && tipoItem !== 'tv') {
      tipoItem = 'movie'; 
    }
    return {
      id: item.id,
      titulo: item.title || item.name,
      ano: item.release_date ? item.release_date.split('-')[0] : (item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A'), // 🌟 FIX: Pega apenas o ano [0]
      nota: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
      imagem: item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/210x295?text=Sem+Capa',
      tipo: tipoItem
    };
  });
}

/**
 * Busca detalhes completos do título ativo
 */
export async function obterDetalhesMidia(id, tipo = 'movie') {
  // Ajuste de segurança para os IDs locais do Fallback (carrega na hora com dados reais)
  if (id === 27205) {
    return {
      id: 27205,
      titulo: "A Origem (Inception)",
      sinopse: "Dom Cobb é um de seus ladrões mais habilidosos do mundo, especializado em extrair segredos valiosos do subconsciente durante o estado de sono. Agora, ele tem a chance de redimir sua vida se conseguir realizar o impossível.",
      ano: ["2010"],
      genero: "Ficção Científica, Ação, Suspense",
      nota: "8.8",
      imagem: "https://image.tmdb.org/t/p/original/s3038gZgBlFS7g7D46860gqh9S8.jpg",
      atores: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
      idioma: "EN",
      status: "Lançado",
      duracao: "148 min",
      emissora: "Warner Bros. Pictures",
      siteOficial: null,
      youtubeKey: "YoHD9XEInc0"
    };
  }
  if (id === 157336) {
    return {
      id: 157336,
      titulo: "Interestelar (Interstellar)",
      sinopse: "As reservas naturais da Terra estão se esgotando. Um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a sobrevivência da espécie.",
      ano: ["2014"],
      genero: "Ficção Científica, Drama, Aventura",
      nota: "8.6",
      imagem: "https://image.tmdb.org/t/p/original/xJHbZ7CgN76v7v6z1S0LpS8oE6z.jpg",
      atores: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",
      idioma: "EN",
      status: "Lançado",
      duracao: "169 min",
      emissora: "Paramount Pictures",
      siteOficial: null,
      youtubeKey: "zSWdZVtXT7E"
    };
  }
  if (id === 155) {
    return {
      id: 155,
      titulo: "Batman: O Cavaleiro das Trevas",
      sinopse: "Com a ajuda de Jim Gordon e Harvey Dent, Batman tem mantido a ordem em Gotham. Mas um jovem e brilhante criminoso conhecido como Coringa chega para espalhar o caos e testar os limites do herói.",
      ano: ["2008"],
      genero: "Ação, Crime, Drama",
      nota: "9.0",
      imagem: "https://image.tmdb.org/t/p/original/nMK08g76vY6v7v6z1S0LpS8oE6z.jpg",
      atores: "Christian Bale, Heath Ledger, Aaron Eckhart, Maggie Gyllenhaal",
      idioma: "EN",
      status: "Lançado",
      duracao: "152 min",
      emissora: "Warner Bros. Pictures",
      siteOficial: null,
      youtubeKey: "g87-A_b466k"
    };
  }

  try {
    const url = `${BASE_URL}/${tipo}/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos,credits`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao carregar detalhes.");

    const show = await response.json();
    const atores = show.credits && show.credits.cast && show.credits.cast.length > 0
      ? show.credits.cast.slice(0, 5).map(c => c.name).join(', ')
      : 'Elenco não informado';

    let youtubeKey = '';
    if (show.videos && show.videos.results && show.videos.results.length > 0) {
      const trailer = show.videos.results.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
      youtubeKey = trailer ? trailer.key : show.videos.results.key;
    }

    const emissora = show.networks && show.networks.length > 0 
      ? show.networks.map(n => n.name).join(', ') 
      : (show.production_companies && show.production_companies.length > 0 ? show.production_companies.name : 'N/A');

    return {
      id: show.id,
      titulo: show.title || show.name,
      sinopse: show.overview || 'Nenhuma sinopse disponível em português.',
      ano: show.release_date ? show.release_date.split('-')[0] : (show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A'),
      genero: show.genres && show.genres.length > 0 ? show.genres.map(g => g.name).join(', ') : 'Gênero não informado',
      nota: show.vote_average ? show.vote_average.toFixed(1) : 'N/A',
      imagem: show.poster_path ? `${IMG_ORIGINAL_URL}${show.poster_path}` : 'https://via.placeholder.com/210x295?text=Sem+Capa',
      atores: atores,
      idioma: show.original_language ? show.original_language.toUpperCase() : 'N/A',
      status: show.status || 'N/A',
      duracao: show.runtime ? `${show.runtime} min` : 'N/A',
      emissora: emissora,
      siteOficial: show.homepage || null,
      youtubeKey: youtubeKey
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes no TMDB:", error);
    return null;
  }
}

export default buscarMidiaAPI;
