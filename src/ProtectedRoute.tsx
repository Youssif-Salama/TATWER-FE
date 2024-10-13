import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

 const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get('token');

  return (token ) ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute