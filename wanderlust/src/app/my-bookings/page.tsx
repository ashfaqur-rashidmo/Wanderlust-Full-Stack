import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
  MyBookingCard,
  type Booking,
} from "@/components/Booking/MyBookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <main className="flex flex-1 flex-col items-center px-6 py-16 text-center">
        <h1 className="font-display text-4xl text-neutral-900 sm:text-5xl">
          My Bookings
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Sign in to view and manage your travel plans.
        </p>

        <Link
          href="/signin"
          className="mt-6 rounded-md bg-cyan-600 px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </Link>
      </main>
    );
  }

  let bookings: Booking[] = [];

  const token = await getTokenFromServer();




  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/my-bookings/${(user.email)}`,

      { 
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch bookings:", res.status);
    } else {
      const data: Booking[] = await res.json();
      bookings = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }

  return <MyBookingCard bookings={bookings} />;
};

export default MyBookingPage;