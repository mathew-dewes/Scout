


import { api } from "@/convex/_generated/api";
import { Star } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { cacheLife } from "next/cache";




export async function FeaturedPlaceByCategory({ category }:
    {category: string}
) {
  
"use cache";
cacheLife('hours');
  const featured = await fetchQuery(api.places.getFeaturedPlaceByCategory,
    {category}
  );

    if (!featured) return null;


  return (
         <div className="flex gap-2 items-center">
                    <Star fill="gold" stroke="0"/>
                    <p className="text-sm">{featured.name} - <span className="font-semibold">{featured.location}</span></p>
                  </div>


  );
}
