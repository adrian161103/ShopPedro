import { useAuth } from "./authprovider";
import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRolles }) => {
  
   const { isAuthenticated,userRole } = useAuth();

   if (!isAuthenticated) {
      return <Navigate to="/register" replace />;
   }
   if (allowedRolles && !allowedRolles.includes(userRole)) {
      return <Navigate to="/" replace />;
   }

   return children;
};


ProtectedRoute.propTypes = {
   children: propTypes.node.isRequired,
   allowedRolles: propTypes.arrayOf(propTypes.string),
 };

export default ProtectedRoute;