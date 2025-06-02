
import { createBrowserRouter } from "react-router-dom";
import Plans from "./pages/Plans.jsx";
import Login from "./pages/Login.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import NotFound from "./components/NotFound.jsx";
import Admin from "./pages/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Página de inicio
  },
  {
    path: "/plans",
    element:  <Plans />, // Página de productos
  },
  
  {
    path: "/login",
    element: <Login />, // Página de login
  },
  {
    path: "/AboutMe",
    element: <AboutMe />, // Página de sobre mi
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (<ProtectedRoute allowedRolles={["ADMIN"]}> < Admin/> </ProtectedRoute>),
  } ,
  {
    path: "*", //wild card siempre va
    element: < NotFound/>,
  }
]);

export {router};