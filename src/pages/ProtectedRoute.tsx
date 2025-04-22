import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuthContext();

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

  if (!user) return <Navigate to="/signin" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
