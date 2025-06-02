import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../hooks/user/useLoginUser.jsx";

function Login() {
  const { loginUser, error } = useLoginUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginUser(form);
    console.log(success);
    if (success) {
      navigate("/");
    }
 
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <motion.div 
          className="login-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src="../../public/img/test/IMG_3871.jpG" 
            alt="Bienvenido a la Tienda Fitness" 
          />

          <motion.div 
            className="login-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
              <div >
                <label htmlFor="password">Contraseña</label>
                <input className="password-input"
                  type={showPassword ? "password" : "text"}
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <span className="password-toggle" style={{ cursor: "pointer", userSelect: "none" }}  onClick={togglePasswordVisibility} > {showPassword ? "👁" : "🙈"}</span>
              </div>
              {error && (
                <p className="error-text">
                  {error || "Usuario o contraseña incorrecto"}
                </p>
              )}
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Iniciar Sesión
              </motion.button>
              <p className="form-register">
                ¿No tienes una cuenta? <a href="/register">Regístrate</a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Login;


