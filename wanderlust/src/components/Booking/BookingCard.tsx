"use client";

import { ArrowRight, Check } from "lucide-react";
import React, { type FormEvent } from "react";
import { Button } from "../ui/button";
import {
  type Destination,
  formatDepartureDate,
  priceLabel,
} from "@/lib/destination";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const BOOKING_PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({
  destination,
}: {
  destination: Destination;
}) => {
  const price = priceLabel(destination.price);
  const departureDate = formatDepartureDate(
    destination.departureDate
  );

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBookNow = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please sign in before booking.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const selectedDepartureDate = formData.get(
      "departureDate"
    ) as string;

    // Exclude the destination ID from the booking document.
    const { _id, ...destinationData } = destination;

    const data = {
      userName: user.name,
      email: user.email,
      image: user.image,
      ...destinationData,
      departureDate: selectedDepartureDate,
      bookingDate: new Date(),
    };

    try {
      const res = await fetch("http://localhost:8000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Booking failed. Please try again.");
        return;
      }

      const bookingRes = await res.json();

      toast.success("Booking successful!");
      console.log("Booking response:", bookingRes);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Could not connect to the server.");
    }
  };

  return (
    <aside className="h-fit rounded-lg border border-neutral-200 shadow-sm">
      <div className="p-5">
        <p className="text-xs text-neutral-500">Starting from</p>
        <p className="font-display text-3xl text-cyan-600">
          {price ?? "—"}
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          per person
        </p>

        <form onSubmit={handleBookNow}>
          <input
            type="date"
            name="departureDate"
            aria-label="Departure date"
            defaultValue={destination.departureDate as string}
            className="mt-4 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-500"
            required
          />

          <Button
            type="submit"
            name="bookNow"
            size="lg"
            className="mt-4 w-full bg-cyan-600 text-white hover:bg-cyan-700"
          >
            Book Now
            <ArrowRight data-icon="inline-end" />
          </Button>
        </form>

        <ul className="mt-5 space-y-2.5">
          {BOOKING_PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-start gap-2 text-xs text-neutral-600"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-green-600" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BookingCard;