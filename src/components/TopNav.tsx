import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Home, PlusCircle, List, User, Briefcase } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/post", icon: PlusCircle, label: "Post Property" },
  { to: "/my-listings", icon: List, label: "My Listings" },
  { to: "/business", icon: Briefcase, label: "Business" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function TopNav() {
  const location = useLocation();

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <RouterNavLink to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">🏠 RentInIreland</span>
        </RouterNavLink>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <RouterNavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </RouterNavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
