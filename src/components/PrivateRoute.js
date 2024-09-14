import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading spinner or something similar
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("PrivateRoute: Redirecting to signup");
    return <Navigate to="/signup" replace />;
  }

  console.log("PrivateRoute: Rendering protected route");
  return <Outlet />;
};


export default PrivateRoute;