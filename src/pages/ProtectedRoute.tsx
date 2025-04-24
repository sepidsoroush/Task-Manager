import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading)
    return (
      <div className="w-full h-screen flex items-center place-content-center">
        <LoadingSpinner
          width={24}
          height={24}
          className="flex items-center place-content-center"
        />
      </div>
    );

  if (!user) return <Navigate to="/" replace />;

  if (location.pathname === "/") return <Navigate to="/tasks" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
