// src/js/componentes/footer/footer.js

export function footer() {
  const container = document.getElementById('footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="footer has-text-centered py-5">
      <div class="content">
        <p>
          <strong>PrimeCine</strong> © ${new Date().getFullYear()} - Todos os direitos reservados.
        </p>
        <p style="font-size: 0.85rem; opacity: 0.7;">
          Desenvolvido como projeto de Single Page Application (SPA) consumindo dados reais do TMDB.
        </p>
      </div>
    </footer>
  `;
}

export default footer;