"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    author: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    author: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      '"The Dubai Desert Safari Was A Once In A Lifetime Experience. From Dune Bashing To Stargazing, Every Moment Was Meticulously Organized By The Team."',
    author: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Japan In Cherry Blossom Season Was A Dream Come True. Our Travel Manager Handled Every Booking Flawlessly And The Ryokan Stays Were Amazing."',
    author: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
];

const pages = [testimonials.slice(0, 2), testimonials.slice(2, 4)];

export function Testimonials() {
  const [page, setPage] = useState(0);

  return (
    <section className="px-6 py-20 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-4xl text-neutral-900 dark:text-neutral-100 sm:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="Previous testimonials"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="flex size-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              disabled={page === pages.length - 1}
              onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
              className="flex size-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-transparent dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((pageItems, pageIndex) => (
              <div
                key={pageIndex}
                className="grid w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-2"
                aria-hidden={pageIndex !== page}
              >
                {pageItems.map((testimonial) => (
                  <article
                    key={testimonial.quote}
                    className="flex border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
                  >
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <p className="text-[15px] leading-relaxed text-neutral-900 dark:text-neutral-200">
                        {testimonial.quote}
                      </p>
                      <div className="mt-8">
                        <p className="text-sm text-cyan-600">
                          — {testimonial.author}
                        </p>
                        <p className="mt-1 pl-3 text-xs text-neutral-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pl-3">
                      <div className="relative h-full w-40 shrink-0 md:w-44">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
