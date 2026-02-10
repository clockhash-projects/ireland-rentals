import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, User } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-lg font-bold text-foreground mb-2">Not signed in</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in to access your profile.
        </p>
        <Button asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="px-4 py-8 max-w-sm mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-lg font-bold text-foreground">{user?.name}</h1>
        <p className="text-sm text-muted-foreground">{user?.email}</p>

        <Button
          variant="outline"
          className="mt-8 w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
