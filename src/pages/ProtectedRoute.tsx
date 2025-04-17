import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
