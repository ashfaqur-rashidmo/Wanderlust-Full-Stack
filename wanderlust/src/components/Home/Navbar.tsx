"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destination", active: false },
  { label: "Add Destination", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="relative z-10 flex items-center justify-between bg-white px-6 py-2.5">
      <nav className="flex items-center gap-5 text-xs font-medium text-neutral-700">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={
              link.active
                ? "font-semibold text-cyan-600 underline underline-offset-4"
                : "hover:text-cyan-600"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 text-lg font-extrabold tracking-tight text-sky-600"
      >
        Wanderlust
      </Link>

      <div className="flex items-center gap-5 text-xs font-medium text-neutral-800">
        <Link
          href="#profile"
          className="flex items-center gap-1.5 hover:text-cyan-600"
        >
          <User className="size-3.5" />
          Profile
        </Link>

        {user ? (
          <Popover>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  aria-label="Open user menu"
                  className="rounded-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600"
                >
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image || undefined}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              }
            />

            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{user.name || "User"}</PopoverTitle>
                <PopoverDescription>
                  {user.email}
                </PopoverDescription>
              </PopoverHeader>

              <div className="p-2">
                <Button
                  onClick={handleSignOut}
                  variant="destructive"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Link href="/signin" className="hover:text-cyan-600">
              Login
            </Link>
            <Link
              href="/signup"
              className="font-semibold text-neutral-900 hover:text-cyan-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}