import { useParams, Link } from "react-router-dom";
import { getPropertyById } from "@/lib/api";
import { formatRent, getWhatsAppLink, getCallLink, propertyTypeIcons } from "@/lib/helpers";
import { ArrowLeft, MapPin, Phone, MessageCircle, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PropertyDetail() {
  const { id } = useParams();
  const property = getPropertyById(id || "");
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-muted-foreground mb-4">Property not found</p>
        <Link to="/" className="text-primary font-medium text-sm">
          ← Back to listings
        </Link>
      </div>
    );
  }

  const TypeIcon = propertyTypeIcons[property.propertyType];

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Back button */}
      <div className="sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3 md:hidden">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="md:max-w-5xl md:mx-auto md:px-6 md:py-8">
        {/* Desktop back link */}
        <Link to="/" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="md:grid md:grid-cols-5 md:gap-8">
          {/* Left column - images */}
          <div className="md:col-span-3">
            {/* Image gallery */}
            <div className="aspect-[16/10] bg-muted overflow-hidden md:rounded-lg">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            {property.images.length > 1 && (
              <div className="flex gap-2 px-4 mt-2 overflow-x-auto md:px-0">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-12 rounded-md overflow-hidden border-2 flex-shrink-0 transition-colors ${
                      i === activeImage ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right column - details */}
          <div className="md:col-span-2">
            <div className="px-4 mt-4 space-y-4 md:px-0 md:mt-0">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-lg font-bold text-foreground leading-snug md:text-2xl">
                    {property.title}
                  </h1>
                  <span className="text-primary font-bold text-lg whitespace-nowrap md:text-2xl">
                    {formatRent(property.rent)}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.area}, {property.city}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <TypeIcon className="h-3.5 w-3.5" />
                    {property.propertyType}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h2 className="text-sm font-semibold text-foreground mb-2">Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h2 className="text-sm font-semibold text-foreground mb-2">Details</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    Posted {property.postedAt}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    {property.postedBy}
                  </div>
                </div>
              </div>

              {/* Desktop CTA - inline */}
              <div className="hidden md:flex gap-3 pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-12"
                >
                  <a href={getCallLink(property.phone)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
                <Button
                  asChild
                  className="flex-[2] h-12 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground"
                >
                  <a
                    href={getWhatsAppLink(property.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Landlord
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA - mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-4 safe-area-bottom md:hidden">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            asChild
            variant="outline"
            className="flex-1 h-12"
          >
            <a href={getCallLink(property.phone)}>
              <Phone className="h-4 w-4 mr-2" />
              Call
            </a>
          </Button>
          <Button
            asChild
            className="flex-[2] h-12 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground"
          >
            <a
              href={getWhatsAppLink(property.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Landlord
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
