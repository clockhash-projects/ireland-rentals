import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { IRISH_COUNTIES, COUNTY_DATA, PROPERTY_TYPES } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPropertyById, updateProperty } from "@/features/properties/property.service";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Honeypot } from "@/components/Honeypot";

export default function EditProperty() {
    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            try {
                const data = await getPropertyById(id);
                setForm({
                    title: data.title,
                    description: data.description || "",
                    propertyType: data.property_type,
                    rent: data.rent_amount.toString(),
                    county: data.county || data.state || "",
                    city: data.city,
                    address: data.address,
                    phone: data.contact_phone || "",
                    website: "",
                });
            } catch (err) {
                toast.error("Failed to load property details.");
                navigate("/my-listings");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, navigate]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-lg font-bold text-foreground mb-2">Login required</h2>
                <Button asChild>
                    <Link to="/login">Sign In</Link>
                </Button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
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
            await updateProperty(id, {
                title: form.title,
                description: form.description,
                property_type: form.propertyType,
                rent_amount: rentValue,
                address: form.address,
                city: form.city,
                county: form.county, // Mapped to new backend field
                contact_phone: cleanPhone,
                website: form.website,
            });

            toast.success("Property updated successfully!");
            navigate("/my-listings");
        } catch (err: any) {
            if (err.response?.status === 403) {
                toast.error("You are not authorized to edit this property.");
            } else {
                toast.error("Failed to update property. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const update = (key: string, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    return (
        <div className="min-h-screen pb-20">
            <div className="sticky top-0 z-30 bg-card/90 backdrop-blur border-b border-border px-4 py-3">
                <Link to="/my-listings" className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Cancel
                </Link>
            </div>

            <div className="px-4 py-5 max-w-lg mx-auto">
                <h1 className="text-lg font-bold text-foreground mb-1">Edit Listing</h1>
                <p className="text-sm text-muted-foreground mb-5">
                    Update the details for your property listing below.
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
                            placeholder="Describe your property..."
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

                    <Honeypot
                        value={form.website}
                        onChange={(val) => update("website", val)}
                    />

                    <Button type="submit" className="w-full h-12 text-base" disabled={submitting}>
                        {submitting ? (
                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating…</>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
