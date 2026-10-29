import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[570px] flex-col justify-between text-white">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        className="object-cover"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pt-10 text-center">
        <h1 className="font-heading max-w-3xl text-5xl leading-tight font-light tracking-tight text-balance sm:text-6xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-5 max-w-md text-sm text-white/90 text-balance">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 bg-cyan-500 px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-cyan-400"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="bg-neutral-200/70 px-6 py-3 text-xs font-semibold tracking-wider text-neutral-800 uppercase transition-colors hover:bg-neutral-200"
          >
            View Destination
          </button>
        </div>
      </div>

      <form className="relative grid grid-cols-2 bg-black/30 backdrop-blur-sm sm:grid-cols-[repeat(4,1fr)_auto]">
        {searchFields.map((field, index) => (
          <div
            key={field.label}
            className={`flex flex-col gap-0.5 px-6 py-3 ${
              index > 0 ? "border-l border-white/20" : ""
            }`}
          >
            <label htmlFor={field.label} className="text-xs font-bold">
              {field.label}
            </label>
            <input
              id={field.label}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-[11px] text-white/80 placeholder:text-white/60 focus:outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-cyan-500 px-12 text-sm font-semibold transition-colors hover:bg-cyan-400"
        >
          Search
        </button>
      </form>
    </section>
  );
}
