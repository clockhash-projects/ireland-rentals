import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { IRISH_COUNTIES, COUNTY_DATA, PROPERTY_TYPES } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProperty } from "@/features/properties/property.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/api/axios";
import { Honeypot } from "@/components/Honeypot";

export default function PostProperty() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    propertyType: "",
    rent: "",
    county: "",
    city: "",
    address: "",
    phone: "",
    website: "", // Honeypot
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length !== files.length) {
      toast.warning("Some files were skipped — only image files are accepted.");
    }
    // Limit to 8 images total
    const combined = [...selectedFiles, ...imageFiles].slice(0, 8);
    setSelectedFiles(combined);
    setPreviewUrls(combined.map((f) => URL.createObjectURL(f)));
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    setPreviewUrls(updated.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.propertyType) { toast.error("Please select a property type."); return; }
    if (!form.city) { toast.error("Please select a city."); return; }

    // Rent validation
    const rentValue = Number(form.rent);
    if (isNaN(rentValue) || rentValue <= 0) {
      toast.error("Please enter a valid monthly rent amount greater than 0.");
      return;
    }

    // Phone validation (+353)
    const phoneRegex = /^\+353[0-9]{7,10}$/;
    const cleanPhone = form.phone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      toast.error("Please enter a valid Irish phone number starting with +353 (e.g., +353871234567)");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Create the property
      const created = await createProperty({
        title: form.title,
        description: form.description,
        property_type: form.propertyType,
        rent_amount: rentValue,
        address: form.address,
        city: form.city,
        county: form.county, // Mapped to new backend field
        zip_code: "0000",
        contact_phone: cleanPhone,
        contact_whatsapp: cleanPhone,
        website: form.website, // Honeypot
      });

      // 2. Upload images if any were selected
      if (selectedFiles.length > 0 && created?.id) {
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));
        try {
          await apiClient.post(`/property-images/upload/${created.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch {
          toast.warning("Property posted, but image upload failed. You can add images later.");
        }
      }

      toast.success("Property posted successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to post property. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
          {/* Title */}
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

          {/* Description */}
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

          {/* Type + Rent */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">Property Type</label>
              <Select value={form.propertyType} onValueChange={(v) => update("propertyType", v)}>
                <SelectTrigger className="mt-1 bg-card">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Rent (€/month)</label>
              <Input
                type="number"
                placeholder="e.g. 1500"
                value={form.rent}
                onChange={(e) => update("rent", e.target.value)}
                required
                min="1"
                className="mt-1"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Total monthly cost in Euros.</p>
            </div>
          </div>

          {/* County Selection */}
          <div>
            <label className="text-sm font-medium text-foreground">County</label>
            <Select
              value={form.county}
              onValueChange={(v) => {
                update("county", v);
                update("city", ""); // Reset city when county changes
              }}
            >
              <SelectTrigger className="mt-1 bg-card">
                <SelectValue placeholder="Select county" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[300px] overflow-y-auto">
                {IRISH_COUNTIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Place/City Selection */}
          <div>
            <label className="text-sm font-medium text-foreground">City / Place</label>
            <Select
              value={form.city}
              onValueChange={(v) => update("city", v)}
              disabled={!form.county}
            >
              <SelectTrigger className="mt-1 bg-card">
                <SelectValue placeholder={form.county ? "Select place" : "Select county first"} />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[300px] overflow-y-auto">
                {form.county && COUNTY_DATA[form.county]?.map((place) => (
                  <SelectItem key={place} value={place}>{place}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!form.county && (
              <p className="text-[10px] text-muted-foreground mt-1 italic">
                Please select a county to see available places.
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-foreground">Area / Specific Address</label>
            <Input
              placeholder="e.g. 12 O'Connell Street or Rathmines"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-foreground">Phone / WhatsApp</label>
            <Input
              placeholder="+353871234567"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
              className="mt-1"
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              Must start with <strong>+353</strong>. Visible to potential tenants.
            </p>
          </div>

          {/* ── Image Upload ── */}
          <div>
            <label className="text-sm font-medium text-foreground">
              Photos <span className="text-muted-foreground font-normal">(up to 8)</span>
            </label>

            {/* Preview grid */}
            {previewUrls.length > 0 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {previewUrls.map((url, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img
                      src={url}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      aria-label="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {/* Add more tile */}
                {previewUrls.length < 8 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square flex items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    aria-label="Add more images"
                  >
                    <Upload className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {/* Drop zone (shown when no images yet) */}
            {previewUrls.length === 0 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 w-full border-2 border-dashed border-border hover:border-primary rounded-xl p-8 text-center transition-colors group"
              >
                <ImageIcon className="h-8 w-8 text-muted-foreground/40 group-hover:text-primary/60 mx-auto mb-2 transition-colors" />
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Click to add photos
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">JPG, PNG, WEBP — up to 8 images</p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <Honeypot
            value={form.website}
            onChange={(val) => update("website", val)}
          />

          <Button type="submit" className="w-full h-12 text-base" disabled={submitting}>
            {submitting ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Posting…</>
            ) : (
              "Post Property"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
