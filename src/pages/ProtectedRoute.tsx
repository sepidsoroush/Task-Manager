import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";

type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/signin" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
