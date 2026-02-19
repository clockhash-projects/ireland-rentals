import { useState, useMemo, useEffect } from "react";
import { useProperties } from "@/features/properties/useProperties";
import { toUIProperty } from "@/features/properties/mappers";
import { IRISH_LOCATIONS } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Home, Search, SlidersHorizontal, Sparkles } from "lucide-react";

const Index = () => {
  const [city, setCity] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filters = useMemo(() => ({
    city: city || undefined,
    property_type: type || undefined,
    search: debouncedSearch || undefined,
  }), [city, type, debouncedSearch]);

  const { properties, loading, error } = useProperties(filters);

  return (
    <div className="min-h-screen bg-background/50">
      {/* ── Modern Hero Section ─────────────────────────────────────────── */}
      <div className="relative pt-10 pb-20 md:pt-16 md:pb-32 overflow-hidden bg-[#0a2e1f]">
        {/* Abstract background elements for a tech-modern feel */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400 blur-[120px]" />
        </div>

        {/* Emerald Isle background image with heavy overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40 scale-105 animate-pulse"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1590059132718-568eaef80ee1?w=1600&q=80&fit=crop')",
            animationDuration: '10s'
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6 fade-in-up">
            <Sparkles className="h-3.5 w-3.5" />
            Empowering New Beginnings in Ireland
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1] fade-in-up [animation-delay:100ms]">
            Ireland's Rental <br />
            <span className="text-emerald-400">Property Classifieds</span>
          </h1>

          <p className="text-emerald-50/70 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up [animation-delay:200ms]">
            The dedicated platform to list and view rented properties across Ireland. Helping families, working professionals, and students find safe and affordable stay.
          </p>

          {/* Glassmorphism Filter Bar */}
          <div className="glass shadow-2xl rounded-3xl p-2 md:p-3 max-w-4xl mx-auto fade-in-up [animation-delay:300ms]">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Keyword Search */}
              <div className="flex-[1.5] relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Area, keywords or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/80 border-0 focus-visible:ring-emerald-500 rounded-2xl text-base shadow-sm"
                />
              </div>

              {/* Location Select */}
              <div className="flex-1">
                <Select onValueChange={(v) => setCity(v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-white/80 border-0 h-14 rounded-2xl font-medium text-base shadow-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-emerald-600 shrink-0" />
                      <SelectValue placeholder="City" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-emerald-100">
                    <SelectItem value="all">All Cities</SelectItem>
                    {IRISH_LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Select */}
              <div className="flex-1">
                <Select onValueChange={(v) => setType(v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-white/80 border-0 h-14 rounded-2xl font-medium text-base shadow-sm">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-emerald-600 shrink-0" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-emerald-100">
                    <SelectItem value="all">Any Type</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Room">Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button (UI Only, filtering is reactive) */}
              <button className="bg-primary hover:bg-emerald-700 text-white font-bold h-14 px-8 rounded-2xl transition-all shadow-lg active:scale-95 hidden md:block">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Listing Section ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-foreground tracking-tight">
              {loading ? "Discovering Homes…" : "Available Spaces"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {loading ? "Checking listings for you..." : `Showing ${properties.length} results based on your filters.`}
            </p>
          </div>

          {(city || type || debouncedSearch) && (
            <button
              onClick={() => { setCity(""); setType(""); setSearchQuery(""); }}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Error Handling */}
        {error && (
          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-8">
            {error}
          </div>
        )}

        {/* Responsive Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-muted animate-pulse aspect-[4/3]"
                style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-32 bg-card rounded-3xl border border-dashed border-border overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full" />
            <Home className="h-16 w-16 mx-auto mb-4 opacity-10 text-emerald-600" />
            <h3 className="text-lg font-bold">No matches found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
              We couldn't find any listings matching your search. Try broadening your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={toUIProperty(property)}
                staggerIndex={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

