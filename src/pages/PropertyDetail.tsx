import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getPropertyById } from "@/features/properties/property.service";
import { toUIProperty } from "@/features/properties/mappers";
import { UIProperty } from "@/types/ui-property";
import { formatRent, getWhatsAppLink, getCallLink } from "@/lib/helpers";
import ImageCarousel from "@/components/ImageCarousel";
import {
  ArrowLeft, MapPin, Home, Phone, MessageCircle,
  Calendar, Tag, CheckCircle, Building2, DoorOpen, Share2
} from "lucide-react";

function PropertyTypeBadge({ type }: { type: string }) {
  const icons: Record<string, React.ElementType> = {
    apartment: Building2,
    house: Home,
    room: DoorOpen,
  };
  const Icon = icons[type?.toLowerCase()] ?? Home;
  const colors: Record<string, string> = {
    apartment: "bg-blue-100 text-blue-700",
    house: "bg-green-100 text-green-700",
    room: "bg-orange-100 text-orange-700",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${colors[type?.toLowerCase()] ?? "bg-muted text-muted-foreground"}`}>
      <Icon className="h-3 w-3" />
      {type}
    </span>
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState<UIProperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getPropertyById(id);
        setProperty(toUIProperty(data));
      } catch {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleShare = async () => {
    if (!property) return;
    const shareData = {
      title: property.title,
      text: `Check out this rental on Irish Rentals: ${property.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyLink();
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      // Modern API
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        return;
      }

      // Fallback for non-secure contexts or older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed"; // avoid scrolling to it
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        toast.success("Link copied to clipboard!");
      } else {
        throw new Error("Copy failed");
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link. Please manually copy the URL.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded-lg w-1/3" />
        <div className="aspect-[4/3] bg-muted animate-pulse rounded-xl" />
        <div className="h-8 bg-muted animate-pulse rounded-lg w-2/3" />
        <div className="h-24 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <Home className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="font-semibold text-foreground mb-1">Property not found</p>
        <p className="text-sm text-muted-foreground mb-6">It may have been removed or the link is invalid.</p>
        <Link to="/" className="text-primary font-medium text-sm hover:underline">← Back to listings</Link>
      </div>
    );
  }

  const postedDate = property.createdAt
    ? new Date(property.createdAt).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen pb-28 md:pb-10 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Back + Share row */}
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-muted transition-colors border border-border"
            >
              Copy link
            </button>
            <button
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors border border-border"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Image Carousel ──────────────────────────────────── */}
        <ImageCarousel
          images={property.images}
          alt={property.title}
          aspectClass="aspect-[4/3] md:aspect-[16/9]"
        />

        {/* ── Title card ─────────────────────────────────────── */}
        <div className="bg-card rounded-2xl border border-border shadow-sm mt-4 p-5 md:p-6 mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <PropertyTypeBadge type={property.propertyType} />
            {postedDate && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {postedDate}
              </span>
            )}
          </div>

          <h1 className="text-xl md:text-2xl font-extrabold text-foreground leading-snug mb-2">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>
              {[property.address, property.area, property.city, property.county].filter(Boolean).join(", ")}
            </span>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-primary">{formatRent(property.rent)}</span>
            <span className="text-xs text-muted-foreground mb-1">per month</span>
          </div>
        </div>

        {/* ── Two-column layout ──────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5">

          {/* Left: Description + Details */}
          <div className="md:col-span-2 space-y-5">
            {property.description && (
              <section className="bg-card rounded-2xl border border-border p-5">
                <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  About this property
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </section>
            )}

            <section className="bg-card rounded-2xl border border-border p-5">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Property details
              </h2>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold capitalize text-foreground">{property.propertyType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rent</p>
                  <p className="font-semibold text-primary">{formatRent(property.rent)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <p className="font-semibold text-foreground">{property.city || "—"}</p>
                </div>
                {property.county && (
                  <div>
                    <p className="text-xs text-muted-foreground">County</p>
                    <p className="font-semibold text-foreground">{property.county}</p>
                  </div>
                )}
                {property.zipCode && (
                  <div>
                    <p className="text-xs text-muted-foreground">Eircode</p>
                    <p className="font-semibold text-foreground">{property.zipCode}</p>
                  </div>
                )}
                {property.address && (
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="font-semibold text-foreground">{property.address}</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right: Contact */}
          <div className="space-y-5">
            <section className="bg-card rounded-2xl border border-border p-5 sticky top-20">
              <h2 className="font-bold text-foreground mb-4">Contact landlord</h2>
              {!isAuthenticated ? (
                <div className="bg-muted/50 rounded-xl p-6 text-center border-2 border-dashed border-border/50">
                  <Phone className="h-8 w-8 mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-semibold mb-1">Contact Hidden</p>
                  <p className="text-xs text-muted-foreground mb-4">Only registered users can view the phone number.</p>
                  <button
                    onClick={() => navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    Sign in to view details
                  </button>
                </div>
              ) : (property.contactPhone || property.contactWhatsapp) ? (
                <div className="space-y-3">
                  {property.contactPhone && (
                    <a
                      href={getCallLink(property.contactPhone)}
                      className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  )}
                  {property.contactWhatsapp && (
                    <a
                      href={getWhatsAppLink(property.contactWhatsapp, property.title, window.location.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp))/90] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  )}
                  {property.contactPhone && (
                    <p className="text-center text-xs text-muted-foreground">{property.contactPhone}</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Phone className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No contact info available</p>
                </div>
              )}
            </section>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
              <p className="font-semibold mb-1">⚠️ Safety tip</p>
              <p>Never pay a deposit before viewing the property in person.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
