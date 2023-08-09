import { Route, Navigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";

const PrivateRoute = ({ path, element, requiredPermission }) => {
  const { user } = useLogin();

  if (user.Nombre_Permiso === requiredPermission) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
