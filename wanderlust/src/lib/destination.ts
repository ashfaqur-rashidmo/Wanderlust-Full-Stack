export type Destination = {
  _id: number | string;
  name: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
};

// Backend doesn't send these yet; the details-page mockup shows them.
export const DEFAULT_RATING = 4.9;
export const DEFAULT_REVIEWS = 234;
export const DEFAULT_HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

export function toPrice(price: Destination["price"]) {
  const value = Number(price);
  return Number.isFinite(value) ? value : 0;
}

export function formatPrice(price: Destination["price"]) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(toPrice(price));
}

export function priceLabel(price: Destination["price"]) {
  if (price === "" || price == null || !Number.isFinite(Number(price))) return null;
  return `$${formatPrice(price)}`;
}

export function formatDepartureDate(departureDate: Destination["departureDate"]) {
  if (!departureDate) return null;
  const date = new Date(departureDate);
  if (Number.isNaN(date.getTime())) return departureDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}
