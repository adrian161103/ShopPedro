import  { useState, useEffect } from 'react';
import AboutMeStart from "./AboutMeStart";
import PlansStart from "./PlansStart";
import { motion } from 'framer-motion';
import LoginStart from './loginStart';
function PrincipalStart() {
  const [hideHero, setHideHero] = useState(false);
  const threshold = 100; // Umbral en píxeles para mostrar/ocultar el héroe
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < threshold) {
        setHideHero(false);
      } else {
        setHideHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const slideLeft = {
    hidden: { x: -200, opacity: 0 },
    visible: { x:   0, opacity: 1 },
  };
  const slideRight = {
    hidden: { x: 200, opacity: 0 },
    visible: { x:   0, opacity: 1 },
  };

  return (
    <main className="principal">
      <section className={`hero ${hideHero ? 'hide' : '' }`}>
        <h2>Pedro Lamanna</h2>
        <p>Entrenador Personal</p>
      </section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideLeft}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <PlansStart />
      </motion.div>

      {/* AboutMeStart entra desde la DERECHA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideRight}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <AboutMeStart />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideLeft}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <LoginStart />
      </motion.div>
    </main>
  );
}

export default PrincipalStart;