import { useState } from "react";
import { motion } from "framer-motion";
import  useRegisterUser  from "../hooks/user/useRegisterUser.jsx";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { registerUser, error } = useRegisterUser();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    age: 0,
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerUser(form);
    if (response) {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        {/* Sección de la imagen con el formulario dentro */}
        <motion.div
          className="login-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/img/test/IMG_3871.JPG"
            alt="Bienvenido a la Tienda Fitness"
          />

          {/* Formulario dentro de la imagen */}
          <motion.div
            className="login-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Registrate</h2>
            <form onSubmit={handleRegister}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ingresa tu nombre"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Ingresa tu apellido"
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="age">Edad</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Ingresa tu edad"
                  required
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              {error && <p className="error-text">error en el registro</p>}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Registrate
              </motion.button>
              <p className="form-register">
                ¿Ya tienes una cuenta? <a href="/">vuelve al inicio</a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Register;
