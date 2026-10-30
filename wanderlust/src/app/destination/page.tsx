import { AllDestinations } from "@/components/Destination/AllDestinations";
import type { Destination } from "@/lib/destination";

const AllDestinationPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-destinations`);
  const data: Destination[] = await res.json();

  return <AllDestinations destinations={data} />;
};

export default AllDestinationPage;
