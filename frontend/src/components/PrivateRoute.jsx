import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

export default function PrivateRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get("/auth/verify");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };

    verify();
  }, []);

  if (isAuth === null) return <p>Checking authentication...</p>;

  return isAuth ? children : <Navigate to="/" replace />;
}