import { IRISH_COUNTIES, COUNTY_DATA, PROPERTY_TYPES } from "@/lib/api";
import { MapPin, Home, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface FilterBarProps {
  county: string;
  city: string;
  propertyType: string;
  sortBy: string;
  onCountyChange: (county: string) => void;
  onCityChange: (city: string) => void;
  onPropertyTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  county,
  city,
  propertyType,
  sortBy,
  onCountyChange,
  onCityChange,
  onPropertyTypeChange,
  onSortChange,
}: FilterBarProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-3">
      {/* Primary filters - always visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            County
          </label>
          <Select value={county || "all"} onValueChange={onCountyChange}>
            <SelectTrigger className="bg-card h-10">
              <SelectValue placeholder="All counties" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50 max-h-[300px] overflow-y-auto">
              <SelectItem value="all">All counties</SelectItem>
              {IRISH_COUNTIES.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Place
          </label>
          <Select value={city || "all"} onValueChange={onCityChange} disabled={!county || county === "all"}>
            <SelectTrigger className="bg-card h-10 disabled:opacity-50">
              <SelectValue placeholder={county && county !== "all" ? "All places" : "Select county"} />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50 max-h-[300px] overflow-y-auto">
              <SelectItem value="all">All places</SelectItem>
              {county && county !== "all" && COUNTY_DATA[county]?.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <Home className="h-3 w-3" />
            Property Type
          </label>
          <Select value={propertyType} onValueChange={onPropertyTypeChange}>
            <SelectTrigger className="bg-card h-10">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="all">All types</SelectItem>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Toggle more filters - mobile only */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-xs text-primary font-medium flex items-center gap-1 md:hidden"
      >
        <SlidersHorizontal className="h-3 w-3" />
        {showMore ? "Less filters" : "More filters"}
      </button>

      {/* Sort - always visible on desktop, toggled on mobile */}
      <div className={`animate-fade-in ${!showMore ? "hidden md:block" : ""}`}>
        <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
          <ArrowUpDown className="h-3 w-3" />
          Sort by
        </label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-card h-10">
            <SelectValue placeholder="Latest first" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="latest">Latest first</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
