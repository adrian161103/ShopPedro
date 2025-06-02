import { Link } from "react-router-dom";
function LoginStart() {

  return (
    
    <article className="productos-destacados aboute">
      <section className="productos">
        <div>
        <h3>Notificaciones</h3>

        <p>
            Si quieres recibir notificaciones de mis nuevos productos, ofertas y promociones, puedes dejarme tu correo electrónico. 
            No te preocupes, no lo compartiré con nadie y solo lo usaré para enviarte información relevante.
        </p>
        <div style={{padding:"0 20px"}}>
        <button className='ButtonStart'> 
        <Link to="/register" className="LinkStart">
        Registrate

        </Link>
      </button>
      </div>
        </div>
        <Link to="/register">
          <div className="SectionsProduct aboutme">
            <img
              src="/img/IMG_3871.JPG"
              alt="Sobre Mi"
            />
          </div>
        </Link>
      </section>
    </article>
  );
}

export default LoginStart;
