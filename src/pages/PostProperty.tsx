import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { IRISH_LOCATIONS, PROPERTY_TYPES } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function PostProperty() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    propertyType: "",
    rent: "",
    city: "",
    address: "",
    phone: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-lg font-bold text-foreground mb-2">Login required</h2>
        <p className="text-sm text-muted-foreground mb-6">
          You need to sign in to post a property listing.
        </p>
        <Button asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Property posted successfully! (mock)");
    navigate("/");
  };

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="px-4 py-5 max-w-lg mx-auto">
        <h1 className="text-lg font-bold text-foreground mb-1">Post a Property</h1>
        <p className="text-sm text-muted-foreground mb-5">
          Fill in the details below to list your rental property.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              placeholder="e.g. Bright 2-Bed in Dublin"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              placeholder="Describe your property, amenities, rules..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              required
              rows={4}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">Property Type</label>
              <Select value={form.propertyType} onValueChange={(v) => update("propertyType", v)}>
                <SelectTrigger className="mt-1 bg-card">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Rent (€/month)</label>
              <Input
                type="number"
                placeholder="e.g. 1200"
                value={form.rent}
                onChange={(e) => update("rent", e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">City / Location</label>
            <Select value={form.city} onValueChange={(v) => update("city", v)}>
              <SelectTrigger className="mt-1 bg-card">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {IRISH_LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Address / Area</label>
            <Input
              placeholder="e.g. Bishopstown, Cork"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Phone / WhatsApp number</label>
            <Input
              placeholder="+353..."
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be visible to potential tenants.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Photos</label>
            <div className="mt-1 border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Photo upload coming soon
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base">
            Post Property
          </Button>
        </form>
      </div>
    </div>
  );
}
