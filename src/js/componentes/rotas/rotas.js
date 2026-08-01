import { Home } from '../paginas/home.js';
import { Filmes, carregarFilmes } from '../paginas/filmes.js';
import { Series, carregarSeries } from '../paginas/series.js';
import { Contato, setupContato } from '../paginas/contato.js';

export const rotas = [
  { url: '#home', label: 'Home', pagina: Home },
  { url: '#filmes', label: 'Filmes', pagina: Filmes, acao: carregarFilmes },
  { url: '#series', label: 'Séries', pagina: Series, acao: carregarSeries },
  { url: '#contato', label: 'Contato', pagina: Contato, acao: setupContato }
];