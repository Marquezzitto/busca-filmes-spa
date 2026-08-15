export function footer() {
  const container = document.getElementById('footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="bem-footer">
      <p>&copy; 2026 BuscaFilmes & Séries SPA — Vanilla JS</p>
    </footer>
  `;
}

export default footer;
