import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function MarketingPage() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center place-content-center">
        <LoadingSpinner
          width={24}
          height={24}
          className="flex items-center place-content-center"
        />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6F2EF] to-white font-sans antialiased overflow-x-hidden">
      <div>Marketing</div>
      <Link to="/signin">Get Started</Link>
    </main>
  );
}
