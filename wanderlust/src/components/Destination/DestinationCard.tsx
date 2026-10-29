// import { ArrowUpRight, Images, MapPin } from 'lucide-react';
// import Image from 'next/image';
// import React from 'react';
// import { toast } from 'react-toastify';
// import Link from 'next/link';


// interface Destination {
   
//   _id: number | string;
//   name: string;
//   country: string;
//   category: string;
//   price: string | number;
//   duration: string;
//   departureDate: string;
//   imageUrl: string;
//   description: string;
//   rating?: number;
//   reviews?: number;
//   highlights?: string[];
// };


// const DestinationCard = ({destination}: { destination: Destination }) => {

//     return (
//          <article>
//       <div className="relative overflow-hidden rounded-lg bg-neutral-100">
//         {destination.imageUrl ? (
//           <Link href={`/destination/${destination._id}`}>
//           <Image
//           height={224}
//           width={400}
//             src={destination.imageUrl}
//             alt={destination.name}
//             className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
//           />
//           </Link>
//         ) : (
//           <div className="flex h-56 w-full items-center justify-center">
//             <Images className="size-8 text-neutral-300" />
//           </div>
//         )}
      
//       </div>

//       <div className="mt-4">
//         <p className="flex items-center gap-1.5 text-xs text-neutral-500">
//           <MapPin className="size-4" />
//           {destination.country}
//         </p>

//         <div className="mt-2.5 flex items-baseline justify-between gap-3">
//           <h3 className="text-lg leading-snug font-medium text-neutral-900">
//             {destination.name}
//           </h3>
          
//         </div>

//         <p className="mt-1 text-xs text-neutral-500">{destination.duration}</p>

//         <button
//           type="button"
//           onClick={() => toast.info("Booking flow coming soon!")}
//           className="mt-3 flex items-center gap-1 text-xs font-semibold tracking-wider text-cyan-600 uppercase underline underline-offset-2 transition-colors hover:text-cyan-700"
//         >
//           Book Now
//           <ArrowUpRight className="size-3.5" />
//         </button>
//       </div>
//     </article>
//     );
// };

// export default DestinationCard;


import { ArrowUpRight, Images, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import type { Destination } from "@/lib/destination";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <article>
      <div className="relative overflow-hidden rounded-lg bg-neutral-100">
        {destination.imageUrl ? (
          <Link href={`/destination/${destination._id}`}>
            <Image
              height={224}
              width={400}
              src={destination.imageUrl}
              alt={destination.name}
              className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        ) : (
          <div className="flex h-56 w-full items-center justify-center">
            <Images className="size-8 text-neutral-300" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="flex items-center gap-1.5 text-xs text-neutral-500">
          <MapPin className="size-4" />
          {destination.country}
        </p>

        <div className="mt-2.5 flex items-baseline justify-between gap-3">
          <h3 className="text-lg leading-snug font-medium text-neutral-900">
            {destination.name}
          </h3>
        </div>

        <p className="mt-1 text-xs text-neutral-500">
          {destination.duration}
        </p>

        <button
          type="button"
          onClick={() => toast.info("Booking flow coming soon!")}
          className="mt-3 flex items-center gap-1 text-xs font-semibold tracking-wider text-cyan-600 uppercase underline underline-offset-2 transition-colors hover:text-cyan-700"
        >
          Book Now
          <ArrowUpRight className="size-3.5" />
        </button>
      </div>
    </article>
  );
};

export default DestinationCard;