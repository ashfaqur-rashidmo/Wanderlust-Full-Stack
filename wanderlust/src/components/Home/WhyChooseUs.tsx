import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#e1f6f3] px-6 py-20 dark:bg-cyan-950/20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl text-neutral-900 sm:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-sm text-neutral-500">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-7 shadow-sm"
            >
              <feature.icon className="size-8 text-cyan-600" />
              <h3 className="mt-7 font-display text-2xl text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
