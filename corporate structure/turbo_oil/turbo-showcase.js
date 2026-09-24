(() => {
  const root = document.querySelector('.turbo-profile');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  root.querySelectorAll('.to-values,.to-activity-grid,.to-strength-grid,.to-service-list,.to-operation-list').forEach(group => {
    [...group.children].forEach((card, index) => card.style.setProperty('--enter-delay', `${Math.min(index * 65, 390)}ms`));
  });
  root.querySelectorAll('.to-value,.to-activity,.to-strength-grid article,.to-operation-list article').forEach(card => {
    let frame;
    const reset = () => {
      cancelAnimationFrame(frame);
      card.style.removeProperty('--card-tilt');
      card.style.removeProperty('--light-x');
      card.style.removeProperty('--light-y');
    };
    card.addEventListener('pointermove', event => {
      if (reduced.matches || event.pointerType !== 'mouse') return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.setProperty('--light-x', `${x * 100}%`);
        card.style.setProperty('--light-y', `${y * 100}%`);
        card.style.setProperty('--card-tilt', `${(x - .5) * 1.6}deg`);
      });
    });
    card.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', reset);
    window.addEventListener('pagehide', reset);
  });
})();
