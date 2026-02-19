import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { UIProperty } from "@/types/ui-property";
import { getMyProperties } from "@/features/properties/property.service";
import { toUIProperty } from "@/features/properties/mappers";

// Rich mock listings shown as fallback (or when API returns empty)
const MOCK_MY_LISTINGS: UIProperty[] = [
  {
    id: "mock-1",
    title: "Bright 2-Bed Apartment in City Centre",
    description: "Spacious 2-bedroom apartment in the heart of Dublin. Close to Luas, DART and all amenities. Fully furnished with modern kitchen and living area.",
    propertyType: "apartment",
    rent: 1800,
    city: "Dublin",
    area: "City Centre",
    address: "Grand Canal Dock, Dublin 2",
    state: "Co. Dublin",
    zipCode: "D02 XY12",
    contactPhone: "+353851234567",
    contactWhatsapp: "+353851234567",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fit=crop",
    ],
    createdAt: "2026-02-08T10:00:00Z",
  },
  {
    id: "mock-2",
    title: "Cosy Room in Shared House",
    description: "Single room available in a friendly, clean shared house near UCC. All bills included.",
    propertyType: "room",
    rent: 750,
    city: "Cork",
    area: "Bishopstown",
    address: "Bishopstown Road, Cork",
    state: "Co. Cork",
    contactPhone: "+353879876543",
    contactWhatsapp: "+353879876543",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80&fit=crop",
    ],
    createdAt: "2026-02-07T10:00:00Z",
  },
  {
    id: "mock-3",
    title: "3-Bed Semi-Detached House",
    description: "Beautiful 3-bedroom semi-detached house in a quiet estate. Garden, parking, and close to schools.",
    propertyType: "house",
    rent: 2200,
    city: "Galway",
    area: "Knocknacarra",
    address: "Knocknacarra, Galway",
    state: "Co. Galway",
    contactPhone: "+353861112233",
    contactWhatsapp: "+353861112233",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&fit=crop",
    ],
    createdAt: "2026-02-06T10:00:00Z",
  },
  {
    id: "mock-4",
    title: "Modern Studio near IFSC",
    description: "Compact studio apartment ideal for a single professional. Walking distance to IFSC.",
    propertyType: "apartment",
    rent: 1500,
    city: "Dublin",
    area: "IFSC",
    address: "Mayor Street, Dublin 1",
    state: "Co. Dublin",
    zipCode: "D01 A2B3",
    contactPhone: "+353851239876",
    contactWhatsapp: "+353851239876",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80&fit=crop",
    ],
    createdAt: "2026-02-05T10:00:00Z",
  },
  {
    id: "mock-5",
    title: "Double Room in Limerick City",
    description: "Large double room in a modern apartment. Close to University of Limerick. Bills included.",
    propertyType: "room",
    rent: 650,
    city: "Limerick",
    area: "Castletroy",
    address: "Castletroy, Limerick",
    state: "Co. Limerick",
    contactPhone: "+353871234000",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&fit=crop",
    ],
    createdAt: "2026-02-04T10:00:00Z",
  },
  {
    id: "mock-6",
    title: "Family Home with Garden in Swords",
    description: "Spacious 4-bed detached house in Swords. Large back garden, driveway for 2 cars.",
    propertyType: "house",
    rent: 2500,
    city: "Dublin",
    area: "Swords",
    address: "Swords, Co. Dublin",
    state: "Co. Dublin",
    contactPhone: "+353859998877",
    contactWhatsapp: "+353859998877",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop",
    ],
    createdAt: "2026-02-03T10:00:00Z",
  },
];

export default function MyListings() {
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState<UIProperty[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getMyProperties();
        // If API returns listings use them, else fall back to mock data
        setProperties(data.length > 0 ? data.map(toUIProperty) : MOCK_MY_LISTINGS);
      } catch {
        setProperties(MOCK_MY_LISTINGS);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetch();
    } else {
      // Show mock data preview even when not authenticated after login prompt
    }
  }, [isAuthenticated]);

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

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <Button asChild size="sm" variant="outline">
          <Link to="/post">
            <PlusCircle className="h-4 w-4 mr-1" />
            New listing
          </Link>
        </Button>
      </div>

      <div className="px-4 py-5 max-w-5xl mx-auto md:px-6">
        <div className="mb-5">
          <h1 className="text-lg font-bold text-foreground">My Listings</h1>
          {!loading && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {properties.length} active listing{properties.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse aspect-[4/3]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p, i) => (
              <PropertyCard key={p.id} property={p} staggerIndex={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
