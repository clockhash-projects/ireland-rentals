import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";
import { Search } from "lucide-react";

export default function HomePage() {
  const [city, setCity] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const properties = getProperties({
    city: city === "all" ? undefined : city,
    propertyType: propertyType === "all" ? undefined : propertyType,
    sortBy: sortBy as "latest" | "price-asc" | "price-desc",
  });

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header - mobile only */}
      <header className="bg-primary px-4 pt-6 pb-5 md:hidden">
        <h1 className="text-xl font-bold text-primary-foreground">
          🏠 RentInIreland
        </h1>
        <p className="text-primary-foreground/80 text-sm mt-0.5">
          Rentals for Indians in Ireland
        </p>
      </header>

      {/* Desktop hero */}
      <div className="hidden md:block bg-primary px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-foreground">
            Find Your Perfect Rental in Ireland
          </h1>
          <p className="text-primary-foreground/80 text-base mt-1">
            Trusted rental listings for the Indian community in Ireland
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 -mt-3 md:px-6 md:-mt-5 md:max-w-6xl md:mx-auto">
        <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
          <FilterBar
            city={city}
            propertyType={propertyType}
            sortBy={sortBy}
            onCityChange={setCity}
            onPropertyTypeChange={setPropertyType}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      {/* Results */}
      <div className="px-4 mt-4 md:px-6 md:max-w-6xl md:mx-auto">
        <p className="text-xs text-muted-foreground mb-3">
          {properties.length} {properties.length === 1 ? "property" : "properties"} found
        </p>

        {properties.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">No properties found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
