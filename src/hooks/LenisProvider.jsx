import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function LenisProvider({ children }) {
  useEffect(() => {
    // Inicializamos Lenis con las opciones deseadas
    const lenis = new Lenis({
      duration: 2, // Duración de la animación (en segundos)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothWheel: true,
      smoothTouch: true,
    });

    // Función que se ejecuta en cada frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // MutationObserver para detectar cambios en el DOM y actualizar Lenis
    const observer = new MutationObserver(() => {
      // Si la función resize existe, la llamamos para recalcular dimensiones
      if (typeof lenis.resize === 'function') {
        lenis.resize();
      }
    });

    // Observamos cambios en el body (nuevos elementos, modificaciones, etc.)
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // Si Lenis implementa un método destroy, lo llamamos para limpiar
      if (typeof lenis.destroy === 'function') {
        lenis.destroy();
      }
    };
  }, []);

  return children;
}

export default LenisProvider;