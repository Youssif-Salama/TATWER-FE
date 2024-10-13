import Cookies from "js-cookie";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const LoginRoute = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get('token');

  // Redirect authenticated users to the home page
  if (token) {
    return <Navigate to="/" />;
  }

  // Render the login or register page if no token exists
  return <>{children}</>;
};

export default LoginRoute;
