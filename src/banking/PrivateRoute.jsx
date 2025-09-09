import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("jwt"); // o sessionStorage
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
