import { home, busca, inicializarBuscaFilmes } from '../../paginas/paginas.js';

const roteador = [
    {
        url: '#inicio',
        label: 'Início',
        pagina: home
    },
    {
        url: '#busca',
        label: 'Buscar Filmes',
        pagina: busca,
        acao: inicializarBuscaFilmes
    }
];

export default roteador;