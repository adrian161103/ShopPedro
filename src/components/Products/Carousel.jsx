import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
// InertiaPlugin se carga desde CDN y está en window.InertiaPlugin
import horizontalLoop from "../utils/horizontalLoop";
import useFetchProducts from "../../hooks/product/useFetchProduct";
import { IoArrowBackOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(Draggable, window.InertiaPlugin);

const Carousel = () => {
  const listRef = useRef(null);
  const slideRefs = useRef([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const totalRef = useRef(null);
  const stepsColumnRef = useRef(null);

  const { fetchProducts, products } = useFetchProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Traer productos al montar
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inicializar slider con GSAP y Draggable
  useEffect(() => {
    if (!products.length) return;

    const slides = slideRefs.current;
    const totalSlides = slides.length;
    totalRef.current.textContent =
      totalSlides < 10 ? `0${totalSlides}` : totalSlides;

    // Construir indicadores numéricos
    const container = stepsColumnRef.current;
    container.innerHTML = "";
    slides.forEach((_, i) => {
      const step = document.createElement("h2");
      step.setAttribute("data-slide-count", "step");
      step.className = "count-heading";
      step.textContent = i + 1 < 10 ? `0${i + 1}` : i + 1;
      container.appendChild(step);
    });
    const allSteps = container.querySelectorAll('[data-slide-count="step"]');

    let activeEl;
    const loop = horizontalLoop(slides, {
      paused: true,
      draggable: true,
      center: false,
      onChange: (el, index) => {
        activeEl && activeEl.classList.remove("active");
        const next = el.nextElementSibling || slides[0];
        next.classList.add("active");
        activeEl = next;
        gsap.to(allSteps, {
          y: `${-100 * index}%`,
          ease: "power3",
          duration: 0.45,
        });
      },
    });

    // Navegación GSAP
    slides.forEach((slide, i) =>
      slide.addEventListener("click", () =>
        loop.toIndex(i - 1, { ease: "power3", duration: 0.725 })
      )
    );
    nextRef.current.addEventListener("click", () =>
      loop.next({ ease: "power3", duration: 0.725 })
    );
    prevRef.current.addEventListener("click", () =>
      loop.previous({ ease: "power3", duration: 0.725 })
    );

    return () => {
      // Aquí podrías limpiar listeners si fuera necesario
    };
  }, [products]);

  // Ocultar header cuando el modal está abierto
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      header.style.display = selectedProduct ? 'none' : '';
    }
    return () => {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
    };
  }, [selectedProduct]);

  return (
    <>
      <section className="CarouselContainer">
        {/* Overlay con contador y controles */}
        <div className="overlay">
          <div className="overlay-inner">
            <div className="overlay-count-row">
              <div className="count-column" ref={stepsColumnRef}>
                <h2 data-slide-count="step" className="count-heading">
                  01
                </h2>
              </div>
              <div className="count-row-divider" />
              <div className="count-column">
                <h2
                  data-slide-count="total"
                  ref={totalRef}
                  className="count-heading"
                >
                  00
                </h2>
              </div>
            </div>
            <div className="overlay-nav-row">
              <button
                aria-label="previous slide"
                ref={prevRef}
                className="cabutton"
              >
                <IoArrowBackOutline className="cabutton-arrow" />
                <div className="cabutton-overlay">
                  <div className="overlay-corner" />
                  <div className="overlay-corner top-right" />
                  <div className="overlay-corner bottom-left" />
                  <div className="overlay-corner bottom-right" />
                </div>
              </button>
              <button
                aria-label="next slide"
                ref={nextRef}
                className="cabutton"
              >
                <IoArrowBackOutline className="cabutton-arrow next" />
                <div className="cabutton-overlay">
                  <div className="overlay-corner" />
                  <div className="overlay-corner top-right" />
                  <div className="overlay-corner bottom-left" />
                  <div className="overlay-corner bottom-right" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Slider principal */}
        <div className="camain">
          <div className="slider-wrap">
            <div data-slider="list" className="slider-list" ref={listRef}>
              {products.map((product, idx) => (
                <div
                  key={product._id}
                  data-slider="slide"
                  ref={(el) => (slideRefs.current[idx] = el)}
                  className={`slider-slide${idx === 0 ? " active" : ""}`}
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="slide-inner">
                    <img className="imgC"
                      src={product.imageUrl}
                      loading="lazy"
                      alt={product.name}
                    />
                    <div className="slide-caption">
                      <div className="caption-dot" />
                      <p className="caption"
                      >{product.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal/overlay de producto */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="product-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="product-card"
              
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }} 
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedProduct(null)}
                aria-label="Cerrar"
              >
                &times;
              </button>
              <h2>{selectedProduct.name}</h2>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />

              <p>{selectedProduct.description}</p>
                   {/* ——— Botón de WhatsApp ——— */}
        <button
          className="whatsapp-btn"
          onClick={() => {
            const whatsappNumber = "5491136074775";  // tu número en formato internacional sin '+'
            // Mensaje personalizado desde el código:
            const message = `¡Hola! Quiero más info sobre "${selectedProduct.name}" 🔥, mi nombre es`;
            const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
              message
            )}`;
            window.open(url, "_blank");
          }}
        >
          Mas Info
        </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Carousel;
