import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative flex min-h-[380px] items-center justify-center px-6 text-white">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex flex-col items-center text-center">
        <h2 className="font-display text-4xl sm:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button
          type="button"
          className="mt-10 flex items-center gap-3 bg-white px-8 py-3.5 text-xs font-semibold tracking-wider text-neutral-900 uppercase transition-colors hover:bg-neutral-200"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
