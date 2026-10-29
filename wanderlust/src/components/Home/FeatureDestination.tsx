import type { Destination } from "@/lib/destination";

import { FeatureDestinationCarousel } from "./FeatureDestinationCarousel";

const FeatureDestination = async () => {
  let destinations: Destination[] = [];

  try {
    const res = await fetch("http://localhost:8000/feature-destinations");

    if (res.ok) {
      const data = await res.json();
      destinations = Array.isArray(data) ? data : [];
    } else {
      console.error("Failed to fetch feature destinations:", res.status);
    }
  } catch (error) {
    console.error("Error fetching feature destinations:", error);
  }

  if (destinations.length === 0) return null;

  return <FeatureDestinationCarousel destinations={destinations} />;
};

export default FeatureDestination;
