
import { api } from "@/convex/_generated/api";
import { Star } from "lucide-react";
import { fetchQuery } from "convex/nextjs";


export async function FeaturedPlaceByLocation({ location }:
    {location: string}
) {

  const featured = await fetchQuery(api.places.getFeaturedPlaceByLocation,
    {location}
  );

    if (!featured) return null;


  return (
         <div className="flex gap-2 items-center">
                    <Star fill="gold" stroke="0"/>
                    <p className="text-sm">{featured.name} - <span className="font-semibold">{featured.address}</span></p>
                  </div>


  );
}
