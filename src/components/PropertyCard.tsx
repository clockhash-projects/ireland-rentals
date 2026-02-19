import { Link } from "react-router-dom";
import { UIProperty } from "@/types/ui-property";
import { formatRent } from "@/lib/helpers";
import { propertyTypeIcons } from "@/lib/helpers";
import { MapPin } from "lucide-react";

interface PropertyCardProps {
  property: UIProperty;
  staggerIndex?: number;
}

export default function PropertyCard({ property, staggerIndex = 0 }: PropertyCardProps) {
  const TypeIcon = propertyTypeIcons[property.propertyType as keyof typeof propertyTypeIcons] ?? MapPin;
  const staggerClass = `card-stagger-${Math.min(staggerIndex + 1, 8)}`;

  return (
    <Link
      to={`/property/${property.id}`}
      className={`group block rounded-xl overflow-hidden bg-card border border-border shadow-sm
                  animate-slide-up-fade ${staggerClass}
                  hover:shadow-xl hover:-translate-y-1 hover:border-primary/30
                  transition-all duration-300 ease-out`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Type badge */}
        <span className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-card/90 backdrop-blur-sm text-[10px] font-semibold text-foreground px-2 py-1 rounded-full capitalize shadow-sm border border-border/50">
          <TypeIcon className="h-2.5 w-2.5" />
          {property.propertyType}
        </span>
        {/* Price badge */}
        <span className="absolute top-2.5 right-2.5 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {formatRent(property.rent)}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="line-clamp-1">{property.area}, {property.city}</span>
        </div>
      </div>
    </Link>
  );
}
