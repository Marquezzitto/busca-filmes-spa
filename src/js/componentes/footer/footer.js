export function renderFooter() {
  const containerFooter = document.getElementById('footer');
  if (!containerFooter) return;

  containerFooter.innerHTML = `
    <footer class="footer">
      <p class="footer__text">&copy; 2026 BuscaFilmes SPA — Filmes e Séries</p>
    </footer>
  `;
}