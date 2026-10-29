import { AllDestinations } from "@/components/Destination/AllDestinations";
import type { Destination } from "@/lib/destination";

const AllDestinationPage = async () => {
  const res = await fetch("http://localhost:8000/all-destinations");
  const data: Destination[] = await res.json();

  return <AllDestinations destinations={data} />;
};

export default AllDestinationPage;
