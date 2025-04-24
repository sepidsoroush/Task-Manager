import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  const { user, loading } = useAuthContext();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [dialogOpen, setDialogOpen] = useState(false);

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
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-6 flex flex-col items-center gap-4">
        <div>Marketing</div>
        <Button
          onClick={() => {
            setAuthMode("signin");
            setDialogOpen(true);
          }}
        >
          Get started
        </Button>
        <AuthDialog
          mode={authMode}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onModeChange={setAuthMode}
        />
      </div>
    </main>
  );
}
