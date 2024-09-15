import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loading from "./UI/Loader";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (!user) {
    console.log("PrivateRoute: Redirecting to signup");
    return <Navigate to="/signup" replace />;
  }

  console.log("PrivateRoute: Rendering protected route");
  return <Outlet />;
};


export default PrivateRoute;