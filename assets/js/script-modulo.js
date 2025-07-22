// Efeito de marcador de texto (highlight) que anima suavemente da esquerda 
// para a direita quando o trecho entra na visualização (scroll):
function animateHighlight() {
  const highlights = document.querySelectorAll('.highlight');

  highlights.forEach(span => {
    const range = document.createRange();
    range.selectNodeContents(span);
    const rects = Array.from(range.getClientRects());

    rects.forEach((rect, index) => {
      const marker = document.createElement('div');
      marker.classList.add('highlight-layer');

      // Posicionamento absoluto relativo ao container
      const containerRect = span.getBoundingClientRect();
      marker.style.top = `${rect.top - containerRect.top}px`;
      marker.style.left = `${rect.left - containerRect.left}px`;
      marker.style.height = `${rect.height}px`;

      // delay animado por linha
      marker.style.transitionDelay = `${index * 600}ms`;

      span.appendChild(marker);

      // força reflow antes de ativar animação
      requestAnimationFrame(() => {
        marker.style.width = `${rect.width}px`;
      });
    });
  });
}

window.addEventListener('load', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateHighlight();
        observer.disconnect(); // anima uma vez só
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('.highlight').forEach(h => observer.observe(h));
});
/* --------------------------------------------------------------------------------------- */

