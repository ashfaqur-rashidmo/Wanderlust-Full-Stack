"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CircleCheck,
  Clock,
  Eye,
  Images,
  MapPin,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDepartureDate, priceLabel } from "@/lib/destination";

export interface Booking {
  _id?: string;
  email?: string;
  userName?: string;
  name?: string;
  image?: string;
  imageUrl?: string;
  price?: string;
  departureDate?: string;
  status?: string;
}

const STATUS_BADGES = {
  confirmed: {
    icon: CircleCheck,
    classes: "border-green-500/40 bg-green-100 text-green-700",
  },
  pending: {
    icon: Clock,
    classes: "border-amber-500/40 bg-amber-100 text-amber-600",
  },
} as const;

function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase() as keyof typeof STATUS_BADGES;
  const badge = STATUS_BADGES[key] ?? STATUS_BADGES.pending;
  const Icon = badge.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${badge.classes}`}
    >
      <Icon className="size-3.5" />
      {status}
    </span>
  );
}

export function MyBookingCard({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(
        `http://localhost:8000/my-bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete failed:", res.status, data);
        alert(data.message || "Failed to cancel booking");
        return;
      }

      console.log("Booking cancelled:", data);

      // Reload the server component and fetch the updated bookings.
      router.refresh();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Could not connect to the backend.");
    }
  };

  return (
    <main className="flex-1 px-6 py-8 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl text-neutral-900 sm:text-5xl">
          My Bookings
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Manage and view your upcoming travel plans
        </p>

        <div className="mt-10 space-y-6">
          {bookings.length === 0 ? (
            <p className="py-16 text-center text-sm text-neutral-500">
              No bookings yet.{" "}
              <Link href="/destination" className="text-cyan-600 hover:underline">
                Explore destinations
              </Link>
            </p>
          ) : (
            bookings.map((booking, index) => {
              const price = priceLabel(booking.price ?? "");
              const departure = formatDepartureDate(booking.departureDate ?? "");
              const status = booking.status ?? "Pending";
              const bookingId = booking._id?.toString();
              const imageUrl = booking.imageUrl ?? booking.image;
              const destinationName = booking.name ?? "Booking";

              return (
                <article
                  key={bookingId ?? index}
                  className="flex flex-col gap-5 rounded-md border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-stretch sm:gap-6"
                >
                  <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-sm bg-neutral-100 sm:h-40 sm:w-60">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={destinationName}
                        fill
                        sizes="(max-width: 640px) 100vw, 240px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Images className="size-8 text-neutral-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div>
                      <StatusBadge status={status} />
                    </div>
                    <h3 className="mt-2.5 font-display text-2xl text-neutral-900 sm:text-3xl">
                      {destinationName}
                    </h3>
                    <p className="mt-2.5 flex items-center gap-1.5 text-xs text-neutral-600">
                      <Calendar className="size-3.5 text-neutral-500" />
                      Departure: {departure ?? "—"}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-600">
                      <MapPin className="size-3.5 text-neutral-500" />
                      Booking ID: {bookingId ?? "—"}
                    </p>
                    {price && (
                      <p className="mt-auto font-display text-3xl text-cyan-700">
                        {price}
                      </p>
                    )}
                  </div>

                  <div className="flex items-end gap-3 self-end sm:self-auto">
                    <button
                      type="button"
                      disabled={!bookingId}
                      onClick={() => {
                        if (bookingId) handleCancelBooking(bookingId);
                      }}
                      className="flex items-center gap-2 rounded-[4px] border border-red-400 bg-white px-4 py-2.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="size-3.5" />
                      Cancel
                    </button>
                    <Link
                      href="/destination"
                      className="flex items-center gap-2 rounded-[4px] bg-cyan-600 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-cyan-700"
                    >
                      <Eye className="size-3.5" />
                      View
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
