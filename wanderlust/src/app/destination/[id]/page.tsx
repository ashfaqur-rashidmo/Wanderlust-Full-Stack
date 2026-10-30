

import { DestinationDetails } from "@/components/Destination/DestinationDetails";
import type { Destination } from "@/lib/destination";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { notFound } from "next/navigation";

const DestinationDetailsPage = async ({ params }: PageProps<"/destination/[id]">) => {
  const { id } = await params;

  const token =await getTokenFromServer()

  console.log("Token from destination details page:", token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) notFound();
  const data: Destination = await res.json();

  return <DestinationDetails destination={data} />;
};

export default DestinationDetailsPage;
