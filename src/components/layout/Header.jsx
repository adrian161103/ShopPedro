import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authprovider";

function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const Start = location.pathname === "/";
  const isPlans = location.pathname === "/plans";


  // Obtenemos la info del usuario y la función logout desde el auth provider
  const { isAuthenticated, logout, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginPage || isRegisterPage || isPlans) {
      setIsFixed(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoginPage, isRegisterPage, isPlans]);

  // Handler para el logout
  const handleLogout = () => {
    logout(); // Ejecuta el logout que provee el auth provider
    navigate("/login"); // Redirige al login tras hacer logout
  };

  return (
    <header
      className={`header ${isFixed ? "scrolled" : "" }  ${
        isLoginPage || isRegisterPage ? "no-padding" : ""
      } ${Start ? "headerStart" : ""} `}
    >
      <nav className={`Nav ${isFixed ? "scrolled" : ""}`}>
        <ul className="HeaderUl">
          <Link to="/">
            <li className="HeaderLi">INICIO</li>
          </Link>
          <Link to="/plans">
            <li className="HeaderLi">PLANES</li>
          </Link>
          <Link to="/aboutme">
            <li className="HeaderLi">SOBRE MI</li>
          </Link>
          {userRole && userRole === "ADMIN" && (
            <Link to="/admin">
              <li className="HeaderLi">ADMIN</li>
            </Link>
          )}
          {/* Si el usuario está logueado, mostramos el botón de logout */}
          {isAuthenticated && (
            <Link className="HeaderLogin" onClick={handleLogout}>
              Desconectar
            </Link>
          ) }
        </ul>
      </nav>
    </header>
  );
}

export default Header;
