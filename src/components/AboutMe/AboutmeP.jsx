// AboutmeP.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.6, ease: "easeOut" },
  }),
};

const clients = [
  {
    before: '/img/alumnos/Lucas inicio.jpeg',
    after: '/img/alumnos/Lucas 2 meses Recomposición.PNG',
    name: 'Lucas',
    description: '¡Logré mi mejor forma!'
  },
  {
    before: '/img/alumnos/Claudia inicio.jpeg',
    after: '/img/alumnos/Claudia 6 meses volumen.PNG',
    name: 'Claudia',
    description: 'Entreno con motivación.'
  },
  {
    before: '/img/alumnos/Cambio en 2 semanas.jpg',
    after: '/img/alumnos/Aumento de masa en 2 meses.jpg',
    name: 'Carlos Ruiz',
    description: 'Más fuerte cada día.'
  },
];

const BeforeAfter = ({ before, after, name }) => (
  <div className="before-after">
    <h3 className="client-name">{name}</h3>
    <div className="images-wrapper">
      <motion.div className="before-image-wrapper" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
        <img src={before} alt="Antes" className="image before-image" />
        <span className="label">Antes</span>
      </motion.div>
      <motion.div className="after-image-wrapper" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
        <img src={after} alt="Después" className="image after-image" />
        <span className="label">Después</span>
      </motion.div>
    </div>
  </div>
);

BeforeAfter.propTypes = {
  before: PropTypes.string.isRequired,
  after: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

function AboutmeP() {
  const [selectedProduct, setSelectedProduct] = useState(null);  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="about-me">
      {[
        {
          src: "/img/IMG_5916.PNG",
          title: "Mi Historia",
          text: `A los 15 años, siendo un apasionado jugador de rugby, recibí la
          noticia que cambiaría mi vida: una doble lesión en las rodillas. Para
          alguien que vive y respira deporte, fue uno de los golpes más duros.
          Entre una operación y otra, pasé dos años alejado de lo que más amaba,
          enfrentándome a la espera, la paciencia y las limitaciones impuestas
          por mi propio cuerpo.`,
        },
        {
          src: "/img/IMG_5917.PNG",
          title: "Descubriendo Nuevos Caminos",
          text: `Durante ese periodo de recuperación, me topé con un mundo desconocido
          para mí: el gimnasio. En mis 16 años de vida deportiva, nunca había
          explorado ese espacio más allá de visitas esporádicas. Ahora, sin
          conocimientos previos, me vi obligado a aprender desde cero.
          Investigué, experimenté, cometí errores y, sobre todo, persistí. Cinco
          años de estudio constante me permitieron adentrarme en el vasto
          universo del fitness, descubriendo tanto la gran cantidad de
          información como la desinformación que existe.`,
          reverse: true,
        },
        {
          src: "/img/IMG_3880.JPG",
          title: "De la Adversidad al Éxito",
          text: `La llegada de la pandemia supuso un reto adicional: sin la opción del
          gimnasio tradicional, decidí fundar mi propia academia de
          entrenamiento. Pero no me limité a un solo escenario. Armé un gimnasio
          en casa, organicé clases en los parques de mi barrio y lancé un
          programa online de entrenamiento. Para mí, la vida es “a todo o nada”:
          cuando quiero algo, me lanzo sin reservas.`,
        },
      ].map((sec, idx) => (
        <motion.section
          key={idx}
          className={`section ${sec.reverse ? "section--reverse" : ""}`}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariant}
        >
          <h2 className="heading gradient-text">{sec.title}</h2>
          <div className="rule sport-rule" />
          <div className="section__content">
            <p className="text sport-text">{sec.text}</p>
            <div className="image-wrapper">
              <div className="image-frame">
                <img src={sec.src} alt={sec.title} className="image" />
              </div>
            </div>
          </div>
        </motion.section>
      ))}

<motion.section
        className="section section--carousel"
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
      >
        <h2 className="heading gradient-text">Transformaciones</h2>
        <div className="rule sport-rule" />
        <div className="carousel-wrapper">
          <Slider {...sliderSettings}>
            {clients.map((client, index) => (
              <BeforeAfter
                key={index}
                before={client.before}
                after={client.after}
                name={client.name}
              />
            ))}
          </Slider>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="product-card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="product-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="product-card-image"
              />
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <button
                className="close-btn"
                onClick={() => setSelectedProduct(null)}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        className="section section--quote"
        custom={5}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
      >
        <h2 className="heading gradient-text">Mi Filosofía</h2>
        <div className="rule sport-rule" />
        <div className="section__content">
          <div className="quote sport-quote">
            “Para vivir a medias, esta vida no vale la pena. El tiempo corre y,
            si tienes que fallar, va a ocurrir igual, aunque no lo quieras.”
          </div>
          <p className="text sport-text">
            Esta frase resume mi compromiso con el entrenamiento y la superación
            personal. Creo firmemente que cada desafío es una oportunidad para
            crecer y que, al final, el esfuerzo y la pasión son los ingredientes
            esenciales para vivir una vida plena y auténtica.
          </p>
        </div>
      </motion.section>
    </div>
  );
}

export default AboutmeP;
