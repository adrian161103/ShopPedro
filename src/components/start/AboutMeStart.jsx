import { Link } from "react-router-dom";
function AboutMeStart() {

  return (
    
    <article className="productos-destacados aboutme">
      <section className="productos">
        <div>
        <h3>Quien soy</h3>

        <p>
          A los 15 años, jugando al rugby, sufrí una doble
          lesión de rodillas que me apartó del deporte que amaba durante dos
          largos años. En ese tiempo, descubrí el gimnasio como herramienta de
          recuperación y, sin experiencia previa, me sumergí en un proceso de
          aprendizaje, ensayo y error que me llevó a explorar a fondo el mundo
          del fitness. 
        </p>
        <div style={{padding:"0 20px"}}>
        <button className='ButtonStart'> 
        <Link to="/aboutme" className="LinkStart">
        Conoce mi historia

        </Link>
      </button>
      </div>
        </div>
        <Link to="/AboutMe">
          <div className="SectionsProduct aboutme">
            <img
              src="../../public//img/IMG_3946 3.JPG"
              alt="Sobre Mi"
            />
          </div>
        </Link>
      </section>
    </article>
  );
}

export default AboutMeStart;
