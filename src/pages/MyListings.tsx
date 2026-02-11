import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_PROPERTIES } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function MyListings() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-lg font-bold text-foreground mb-2">Login required</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in to see your posted listings.
        </p>
        <Button asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  // Mock: show first 2 as user's listings
  const myListings = MOCK_PROPERTIES.slice(0, 2);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <Button asChild size="sm" variant="outline">
          <Link to="/post">
            <PlusCircle className="h-4 w-4 mr-1" />
            New
          </Link>
        </Button>
      </div>

      <div className="px-4 py-5 md:max-w-5xl md:mx-auto md:px-6">
        <h1 className="text-lg font-bold text-foreground mb-4">My Listings</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {myListings.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
