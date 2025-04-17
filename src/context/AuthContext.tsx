import React, { createContext, useContext, ReactNode } from "react";
import useAuth, { AuthContextType } from "../hooks/useAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authHook = useAuth();

  return (
    <AuthContext.Provider value={authHook}>{children}</AuthContext.Provider>
  );
};
