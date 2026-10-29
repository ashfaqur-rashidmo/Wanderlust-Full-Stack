"use client";

import { ArrowLeft, Calendar, Check, MapPin,  Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  DEFAULT_HIGHLIGHTS,
  DEFAULT_RATING,
  DEFAULT_REVIEWS,

  type Destination,
} from "@/lib/destination";
import EditDestinationDialog from "./EditDestinationDialog";
import DeleteDestination from "./DeleteDestination";
import BookingCard from "../Booking/BookingCard";


export function DestinationDetails({ destination }: { destination: Destination }) {

  console.log("DestinationDetails received destination:", destination);
  
  const rating = destination.rating ?? DEFAULT_RATING;
  const reviews = destination.reviews ?? DEFAULT_REVIEWS;
  const highlights = destination.highlights ?? DEFAULT_HIGHLIGHTS;


  return (
    <main className="px-6 py-8 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destination"
            className="flex items-center gap-2 text-sm text-neutral-700 transition-colors hover:text-cyan-600"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex gap-3">
            
            <EditDestinationDialog destination={destination}/>
            
            <DeleteDestination destination={destination._id}/>
            
          </div>
        </div>

        <div className="relative mt-6 h-64 overflow-hidden rounded-lg bg-neutral-100 sm:h-80">
          {destination.imageUrl ? (
            <Image
              src={destination.imageUrl}
              alt={destination.name}
              fill
              sizes="(min-width: 1152px) 1088px, (min-width: 640px) 672px, calc(100vw - 48px)"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0" />
          )}
        </div>

        <hr className="my-8 border-neutral-200" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <p className="flex items-center gap-1.5 text-sm text-neutral-500">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 font-display text-4xl text-neutral-900 sm:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5 font-medium text-neutral-900">
                <Star className="size-4 fill-current text-green-600" />
                {rating.toFixed(1)}
                <span className="font-normal text-neutral-500">({reviews} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Calendar className="size-4" />
                {destination.duration || "Duration to be announced"}
              </span>
            </div>

            <h2 className="mt-10 font-display text-2xl text-neutral-900 sm:text-3xl">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {destination.description || "No description available yet."}
            </p>

            <h2 className="mt-10 font-display text-2xl text-neutral-900 sm:text-3xl">Highlights</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-neutral-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <BookingCard destination={destination} />

        </div>
      </div>
    </main>
  );
}
