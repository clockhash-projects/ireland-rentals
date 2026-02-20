import { Home, Building2, DoorOpen } from "lucide-react";

export const propertyTypeIcons = {
  apartment: Building2,
  house: Home,
  room: DoorOpen,
} as const;

export function formatRent(rent: number): string {
  return `€${rent.toLocaleString()}/mo`;
}

export function getWhatsAppLink(phone: string, propertyTitle: string, propertyUrl: string): string {
  const cleaned = phone.replace(/[^0-9+]/g, "");
  const msg = `I would like to know more about this property: ${propertyTitle}\n${propertyUrl}`;
  return `https://wa.me/${cleaned.replace("+", "")}?text=${encodeURIComponent(msg)}`;
}

export function getCallLink(phone: string): string {
  return `tel:${phone}`;
}
