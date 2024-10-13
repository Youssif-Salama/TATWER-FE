import { decodeToken } from "@/methods/GlobalMethods";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Define the shape of the decoded token
interface DecodedToken {
  Role?: string;
}

const AdminTodoRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = decodeToken(token) as DecodedToken;
        setRole(decodedToken?.Role || null);
      } catch (error) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (role === "super_admin") {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminTodoRoute;
