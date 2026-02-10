import { Link } from "react-router-dom";
import { Property } from "@/lib/api";
import { formatRent } from "@/lib/helpers";
import { propertyTypeIcons } from "@/lib/helpers";
import { MapPin } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const TypeIcon = propertyTypeIcons[property.propertyType];

  return (
    <Link
      to={`/property/${property.id}`}
      className="block rounded-lg overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-card-foreground text-sm leading-snug line-clamp-2">
            {property.title}
          </h3>
          <span className="text-primary font-bold text-sm whitespace-nowrap">
            {formatRent(property.rent)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {property.area}, {property.city}
          </span>
          <span className="flex items-center gap-1 capitalize">
            <TypeIcon className="h-3 w-3" />
            {property.propertyType}
          </span>
        </div>
      </div>
    </Link>
  );
}
