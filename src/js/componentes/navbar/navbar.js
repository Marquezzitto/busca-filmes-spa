function navbar(item_menu){
    const navbarElement = document.getElementById('navbar');
    navbarElement.innerHTML = `
        <aside class="bem-sidebar">
            <a href="#inicio" class="bem-sidebar__brand">CineBusca 🎬</a>
            <ul class="bem-sidebar__menu">
                ${
                    item_menu.map((item) => {
                        return `
                        <li class="bem-navbar__item">
                            <a href="${item.url}" class="bem-sidebar__link">${item.label}</a>
                        </li>`;
                    }).join('')
                }
            </ul>
        </aside>
    `;
}

export default navbar;