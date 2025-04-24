import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Layout,
  ListTodo,
  UserCircle2,
  Moon,
} from "lucide-react";

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

  const features = [
    {
      title: "Multiple Boards",
      description:
        "Organize tasks across different projects with dedicated boards",
      icon: <Layout className="w-6 h-6" />,
    },
    {
      title: "To-Do Lists",
      description: "Create and manage task lists with drag-and-drop simplicity",
      icon: <ListTodo className="w-6 h-6" />,
    },
    {
      title: "Authentication",
      description: "Secure access with modern authentication methods",
      icon: <UserCircle2 className="w-6 h-6" />,
    },
    {
      title: "Dark Mode",
      description: "Easy on the eyes with automatic dark mode support",
      icon: <Moon className="w-6 h-6" />,
    },
  ];

  const steps = [
    {
      title: "Sign Up",
      description: "Create your account in seconds",
    },
    {
      title: "Add Tasks",
      description: "Create and organize your tasks",
    },
    {
      title: "Drag & Drop",
      description: "Easily prioritize and manage tasks",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6F2EF] to-white dark:from-gray-900 dark:to-gray-800 font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto pt-24 pb-12 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Chore app
          </h1>
          <h4 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Stay on Track — Manage Tasks Like a Pro
          </h4>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            The simple, powerful way to organize work and get more done. Perfect
            for individuals and teams.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                setAuthMode("signup");
                setDialogOpen(true);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started Free
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-b from-gray-900 to-gray-800 p-2 shadow-2xl">
          <div className="h-[300px] rounded bg-gray-800/50 ">
            <img
              src="/hero.webp"
              alt="Hero image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="font-semibold mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Free and open source
          </h2>
          <div className="grid md:grid-cols-1 gap-8 max-w-xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border dark:border-gray-700">
              <h3 className="font-semibold text-xl mb-4 dark:text-white">
                Free
              </h3>
              <p className="text-3xl font-bold mb-6 dark:text-white">
                $0
                <span className="text-gray-500 dark:text-gray-400 text-lg font-normal">
                  /month
                </span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Unlimited boards
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Unlimited tasks
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Basic task management
                  </span>
                </li>
              </ul>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setAuthMode("signup");
                  setDialogOpen(true);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Join thousands of users who are already managing tasks better.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => {
              setAuthMode("signup");
              setDialogOpen(true);
            }}
          >
            Start Your Free Account
          </Button>
        </div>
      </section>

      <AuthDialog
        mode={authMode}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onModeChange={setAuthMode}
      />
    </main>
  );
}
