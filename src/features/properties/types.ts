export interface Property {
    id: string;
    title: string;
    description?: string;
    rent_amount: number;
    property_type: string;
    location_id?: string;
    address?: string;
    city?: string;
    county?: string;
    state?: string;
    zip_code?: string;
    contact_phone?: string;
    contact_whatsapp?: string;
    owner_id?: string;
    is_active?: boolean;
    created_at: string;
    image_urls?: string[];  // populated by backend from property_images table
}
