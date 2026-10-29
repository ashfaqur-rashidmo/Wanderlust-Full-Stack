import { ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Quick Links",
    links: ["Home", "Destinations", "My Bookings", "My Profile"],
  },
  {
    title: "Support",
    links: ["Help Center", "Terms of Service", "Privacy Policy"],
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.9.423.423.684.82.9 1.381.166.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.902 1.382-.422.423-.82.684-1.38.902-.421.166-1.057.361-2.228.421-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.015-4.849-.074-1.171-.061-1.806-.256-2.228-.421-.563-.224-.96-.479-1.382-.902-.422-.422-.684-.82-.9-1.38-.166-.421-.362-1.057-.42-2.228-.058-1.265-.071-1.646-.071-4.85 0-3.204.015-3.584.071-4.849.06-1.17.256-1.806.421-2.228.224-.563.479-.96.9-1.382.423-.422.817-.684 1.38-.9.422-.166 1.057-.362 2.228-.42 1.266-.058 1.646-.071 4.85-.071zm6.402 2.055a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 5.757a6.243 6.243 0 1 0 0 12.486 6.243 6.243 0 0 0 0-12.486zm0 10.294a4.05 4.05 0 1 1 0-8.101 4.05 4.05 0 0 1 0 8.101z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 px-6 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="font-logo text-5xl sm:text-6xl">Wanderlast</p>
        <p className="mt-4 text-sm text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <h3 className="font-display text-sm tracking-[0.2em] text-neutral-200 uppercase">
              Newsletter
            </h3>
            <p className="mt-2 text-xs text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-4 max-w-56">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-neutral-800 py-2.5 pr-10 pl-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-white transition-colors hover:text-cyan-400"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-sm tracking-[0.2em] text-neutral-200 uppercase">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-sm tracking-[0.2em] text-neutral-200 uppercase">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-neutral-300">
              <li>
                <a href="tel:7869016222" className="transition-colors hover:text-white">
                  786 901 6222
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6">
          <p className="text-xs text-neutral-400">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-neutral-300">
            <a href="#" aria-label="X" className="transition-colors hover:text-white">
              <XIcon className="size-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-white">
              <LinkedInIcon className="size-4" />
            </a>
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-white">
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
