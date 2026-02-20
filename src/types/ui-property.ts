export interface UIProperty {
    id: string;
    title: string;
    rent: number;
    propertyType: string;
    area: string;
    city: string;
    images: string[];
    // Extended fields from backend PropertyOut
    description?: string;
    address?: string;
    county?: string;
    zipCode?: string;
    contactPhone?: string;
    contactWhatsapp?: string;
    createdAt?: string;
}
