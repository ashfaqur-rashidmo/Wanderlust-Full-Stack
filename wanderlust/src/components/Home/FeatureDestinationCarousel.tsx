"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Images,
  MapPin,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  DEFAULT_RATING,
  priceLabel,
  type Destination,
} from "@/lib/destination";

interface FeatureDestinationCarouselProps {
  destinations: Destination[];
}

export function FeatureDestinationCarousel({
  destinations,
}: FeatureDestinationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = destinations.length;

  // Scroll offset of card `i` relative to the first card (children are the
  // card elements; the row is `relative` so offsetLeft is container-relative).
  const cardOffset = (i: number) => {
    const row = scrollRef.current;
    const first = row?.children[0] as HTMLElement | undefined;
    const target = row?.children[i] as HTMLElement | undefined;
    if (!first || !target) return 0;
    return target.offsetLeft - first.offsetLeft;
  };

  const scrollToIndex = (i: number) => {
    const clamped = Math.min(Math.max(i, 0), total - 1);
    scrollRef.current?.scrollTo({
      left: cardOffset(clamped),
      behavior: "smooth",
    });
    setIndex(clamped);
  };

  const handleScroll = () => {
    const row = scrollRef.current;
    if (!row) return;
    const pos = row.scrollLeft;
    let nearest = 0;
    for (let i = 1; i < total; i++) {
      if (
        Math.abs(cardOffset(i) - pos) < Math.abs(cardOffset(nearest) - pos)
      ) {
        nearest = i;
      }
    }
    setIndex(nearest);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6 pr-6 pl-6 md:pr-12 md:pl-12 xl:pr-16 xl:pl-20">
        <div>
          <h2 className="font-heading text-4xl leading-tight text-neutral-900 md:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/destination"
          className="flex items-center gap-3 border border-cyan-500 px-5 py-3 text-xs font-medium tracking-widest text-cyan-600 uppercase transition-colors hover:bg-cyan-50"
        >
          All Destinations
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pr-6 pl-6 [scrollbar-width:none] md:pl-12 xl:pl-20 [&::-webkit-scrollbar]:hidden"
      >
        {destinations.map((destination) => {
          const price = priceLabel(destination.price);
          // Backend doesn't send rating yet; fall back to the shared mock.
          const rating = destination.rating ?? DEFAULT_RATING;

          return (
            <article
              key={destination._id}
              className="w-[min(440px,85vw)] shrink-0 snap-start"
            >
              <div className="relative overflow-hidden bg-neutral-100">
                {destination.imageUrl ? (
                  <Link href={`/destination/${destination._id}`}>
                    <Image
                      src={destination.imageUrl}
                      alt={destination.name}
                      width={880}
                      height={500}
                      sizes="(max-width: 768px) 85vw, 440px"
                      className="h-64 w-full object-cover"
                    />
                  </Link>
                ) : (
                  <div className="flex h-64 w-full items-center justify-center">
                    <Images className="size-8 text-neutral-300" />
                  </div>
                )}

                <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded bg-white px-2.5 py-1.5 text-sm font-semibold text-neutral-900">
                  {rating}
                  <Star className="size-4 fill-neutral-900 text-neutral-900" />
                </span>
              </div>

              <div className="mt-4">
                <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <MapPin className="size-4" />
                  {destination.country}
                </p>

                <div className="mt-2 flex items-end justify-between gap-4">
                  <h3 className="font-display text-2xl leading-snug text-neutral-900">
                    {destination.name}
                  </h3>
                  {price && (
                    <p className="font-display text-2xl leading-none text-neutral-900">
                      {price}
                      <span className="ml-0.5 font-sans text-xs font-normal text-neutral-500">
                        /Person
                      </span>
                    </p>
                  )}
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                  <Calendar className="size-4" />
                  {destination.duration}
                </p>

                <button
                  type="button"
                  onClick={() => toast.info("Booking flow coming soon!")}
                  className="mt-4 flex items-center gap-1 text-xs font-semibold tracking-wider text-cyan-600 uppercase underline underline-offset-4 transition-colors hover:text-cyan-700"
                >
                  Book Now
                  <ArrowUpRight className="size-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex items-center gap-6 pr-6 pl-6 md:pr-12 md:pl-12 xl:pr-16 xl:pl-20">
        <p className="text-lg text-neutral-900">
          {index + 1}/{total}
        </p>

        <div className="relative h-px flex-1 bg-neutral-200">
          <span
            className="absolute top-0 left-0 h-px bg-neutral-900 transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous destinations"
            disabled={index === 0}
            onClick={() => scrollToIndex(index - 1)}
            className="flex size-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next destinations"
            disabled={index >= total - 1}
            onClick={() => scrollToIndex(index + 1)}
            className="flex size-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
