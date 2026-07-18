function navbar(item_menu) {
    const navbarElement = document.getElementById('navbar');
    
    navbarElement.innerHTML = `
        <header class="bem-topbar">
            <div class="bem-topbar__left">
                <button id="btnMenu" class="bem-btn-hamburguer">☰</button>
                <a href="#inicio" class="bem-topbar__brand">CineBusca 🎬</a>
            </div>
            
            <!-- BARRA DE PESQUISA CENTRALIZADA NO CABEÇALHO (Removido o disabled) -->
            <div class="bem-topbar__search">
                <input type="text" id="inputPesquisaGlobal" placeholder="Pesquisar filmes ou séries..." class="bem-form__input">
            </div>
        </header>
        
        <aside id="sidebarMenu" class="bem-sidebar">
            <ul class="bem-sidebar__menu">
                ${
                    item_menu.map((item) => {
                        return `
                        <li>
                            <a href="${item.url}" class="bem-sidebar__link link-menu-item">${item.label}</a>
                        </li>`;
                    }).join('')
                }
            </ul>
        </aside>
    `;

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const btnMenu = document.getElementById('btnMenu');
    const sidebarMenu = document.getElementById('sidebarMenu');

    btnMenu.addEventListener('click', () => {
        sidebarMenu.classList.toggle('bem-sidebar--aberto');
    });

    const links = document.querySelectorAll('.link-menu-item');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', () => {
            sidebarMenu.classList.remove('bem-sidebar--aberto');
        });
    }

    // --- LÓGICA DO CAMPO DE PESQUISA ADICIONADA AQUI ---
    const inputPesquisaGlobal = document.getElementById('inputPesquisaGlobal');

    if (inputPesquisaGlobal) {
        inputPesquisaGlobal.addEventListener('keyup', (evento) => {
            if (evento.key === 'Enter') {
                const termo = inputPesquisaGlobal.value.trim();
                
                if (termo) {
                    // Envia o usuário para a página de catálogo com o termo na URL
                    window.location.hash = `#catalogo?busca=${encodeURIComponent(termo)}`;
                } else {
                    // Se o usuário limpar o campo e der Enter, recarrega o catálogo limpo
                    window.location.hash = '#catalogo';
                }
            }
        });
    }
}

export default navbar;