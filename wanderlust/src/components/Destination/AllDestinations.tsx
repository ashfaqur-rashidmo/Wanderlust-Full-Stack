"use client";

import { useState } from "react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DestinationCard from "./DestinationCard";
import type { Destination } from "@/lib/destination";

const CATEGORY_OPTIONS = [
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
  "Luxury",
  "Family",
] as const;

const PRICE_RANGES = [
  { value: "any", label: "Price Range" },
  { value: "under-1000", label: "Under $1,000" },
  { value: "1000-2000", label: "$1,000 – $2,000" },
  { value: "2000-3000", label: "$2,000 – $3,000" },
  { value: "over-3000", label: "Over $3,000" },
] as const;

const SORT_OPTIONS = [
  { value: "featured", label: "Sort By" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
] as const;

function toPrice(price: Destination["price"]) {
  const value = Number(price);
  return Number.isFinite(value) ? value : 0;
}

function isInPriceRange(price: Destination["price"], range: string) {
  const value = toPrice(price);
  switch (range) {
    case "under-1000":
      return value < 1000;
    case "1000-2000":
      return value >= 1000 && value <= 2000;
    case "2000-3000":
      return value > 2000 && value <= 3000;
    case "over-3000":
      return value > 3000;
    default:
      return true;
  }
}




export function AllDestinations({ destinations }: { destinations: Destination[] }) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [sortBy, setSortBy] = useState("featured");

  const items = Array.isArray(destinations) ? destinations : [];

  const filtered = items.filter(
    (destination) =>
      (category === "all" || destination.category === category) &&
      isInPriceRange(destination.price, priceRange),
  );

  const sorted = [...items];
  if (sortBy === "price-asc") sorted.sort((a, b) => toPrice(a.price) - toPrice(b.price));
  else if (sortBy === "price-desc") sorted.sort((a, b) => toPrice(b.price) - toPrice(a.price));
  else if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="px-6 py-12 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl text-neutral-900 sm:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Find your perfect travel experience from our curated collection
        </p>

      

        <p className="mt-4 text-sm text-neutral-700">
          Showing {sorted.length} destination{sorted.length === 1 ? "" : "s"}
        </p>

        {sorted.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((destination, index) => (
              <DestinationCard
                key={destination._id ?? `${destination.name}-${index}`}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-neutral-500">
            No destinations match your filters. Try adjusting them or{" "}
            <a href="/add-destination" className="text-cyan-600 underline underline-offset-2">
              add a new one
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
