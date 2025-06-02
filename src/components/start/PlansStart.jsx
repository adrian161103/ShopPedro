import { Link } from "react-router-dom";

function PlansStart() {
  return (
    <article className="productos-destacados">
      <section className="productos">
        <div>
        <h3>El comienzo...</h3>
        <p>
          Al día de hoy, luego de 8 años de trabajo, estudio y muchas pruebas,
          creé el programa de entrenamiento online y presencial más completo del
          mercado. un coach o entrenador no es quien te da solo una serie de
          ejercicios o una dieta, sino la persona que va a cambiar hábitos
          principalmente mentales y emocionales en tu vida. Si solo es una
          rutina o una dieta, entonces el trabajo es vacío. Esa falta de
          contenido es la que luego produce la intermitencia de comenzar y dejar
          los cambios que planeabas en tu vida. 
        </p>
      <div style={{padding:"0 20px", width:"100%"}}>
        <button className='ButtonStart'> 
        <Link to="/plans" className="LinkStart">
        Unete a mi Programa
        </Link>
      </button>
      </div>
      </div>
        <Link to="/plans">
          <div className="SectionsProduct plans">
            <img src="../../public//img/IMG_3881.JPG" alt="Plan" />
          </div>
        </Link>
      </section>
    </article>
  );
}

export default PlansStart;
