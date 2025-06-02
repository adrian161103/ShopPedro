function NotFound() {
    return (
    <div>
    <h2>El sitio que estas buscando no existe</h2>
    <p>Por favor, regresa a la pagina principal</p>
    <button onClick={() => window.location.href = "/"}>Ir a la pagina principal</button>

        
        </div>
    );
        }
export default NotFound


//el * que se usa para las rutas es de forma global (osea que no se tiene que hacer por cada ruta), si no se usa el * se tiene que hacer por cada ruta
//not found sirve para paginas que no se encuentran, ejemplo van a la pagina y van a una ruta que no coincide, o esta oculta se envia ese mensaje.