import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  authenticated: boolean;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
  authenticated,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const [_authStatus, setAuthStatus] = useState(
  //   localStorage.getItem("isLoggedIn")
  // );

  useEffect(() => {
    const checkAuth = () => {
      const currentAuthStatus = localStorage.getItem("isLoggedIn");
      if (authenticated && !currentAuthStatus) {
        navigate("/login", { replace: true });
      } else if (!authenticated && currentAuthStatus) {
        navigate("/", { replace: true });
      } else {
        setLoading(false);
      }
    };

    checkAuth();

   
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [authenticated, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
