import { API_BASE_URL } from "@/api/axios";
import { Property } from "./types";
import { UIProperty } from "@/types/ui-property";

const FALLBACK_IMAGES: Record<string, string[]> = {
    apartment: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fit=crop",
    ],
    house: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop",
    ],
    room: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&fit=crop",
    ],
};

function resolveImages(property: Property): string[] {
    // Use real images from the backend if available
    if (property.image_urls && property.image_urls.length > 0) {
        return property.image_urls.map((url) => {
            if (url.startsWith("http")) return url;
            const baseUrl = import.meta.env.VITE_API_URL || API_BASE_URL;
            return `${baseUrl}${url}`;
        });
    }
    // Fall back to curated Unsplash images by type
    const key = property.property_type?.toLowerCase() ?? "apartment";
    return FALLBACK_IMAGES[key] ?? FALLBACK_IMAGES.apartment;
}

export const toUIProperty = (property: Property): UIProperty => ({
    id: property.id,
    title: property.title,
    description: property.description,
    rent: property.rent_amount,
    propertyType: property.property_type,
    area: property.city ?? property.location_id ?? "Ireland",
    city: property.city ?? "Ireland",
    address: property.address,
    state: property.state,
    zipCode: property.zip_code,
    contactPhone: property.contact_phone,
    contactWhatsapp: property.contact_whatsapp,
    createdAt: property.created_at,
    images: resolveImages(property),
});
