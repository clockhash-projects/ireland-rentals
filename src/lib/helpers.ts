import { Home, Building2, DoorOpen } from "lucide-react";

export const propertyTypeIcons = {
  apartment: Building2,
  house: Home,
  room: DoorOpen,
} as const;

export function formatRent(rent: number): string {
  return `€${rent.toLocaleString()}/mo`;
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/[^0-9+]/g, "");
  const msg = message || "Hi, I saw your property listing on RentInIreland and I'm interested.";
  return `https://wa.me/${cleaned.replace("+", "")}?text=${encodeURIComponent(msg)}`;
}

export function getCallLink(phone: string): string {
  return `tel:${phone}`;
}
