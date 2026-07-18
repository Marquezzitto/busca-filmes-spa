import { home, series, filmes, catalogo } from "../../paginas/paginas.js";

function sobre() {
    return `<h1 class="bem-text-primary">Sobre o CineBusca</h1><p class="bem-text-muted-util">Sua aplicação Single Page Application estática desenvolvida com fins acadêmicos.</p>`;
}

function contato() {
    return `<h1 class="bem-text-primary">Contato</h1><p class="bem-text-muted-util">Entre em contato com o suporte ou envie sugestões.</p>`;
}

const roteador = [
    { url: '#inicio', label: 'Início', pagina: home },
    { url: '#catalogo', label: 'Catálogo', pagina: catalogo },
    { url: '#filmes', label: 'Filmes', pagina: filmes },
    { url: '#series', label: 'Séries', pagina: series },
    { url: '#sobre', label: 'Sobre', pagina: sobre },
    { url: '#contato', label: 'Contato', pagina: contato }
];

export default roteador;