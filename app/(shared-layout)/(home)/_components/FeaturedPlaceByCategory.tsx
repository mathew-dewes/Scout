"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


export function FeaturedPlaceName({ category }:
    {category: string}
) {
  const featured = useQuery(api.places.getFeaturedPlaceByCategory,
    {category}
  );

    if (!featured) return null;


  return (
    <p className="text-sm">{featured.name} - <span className="font-semibold">{featured.location}</span>
    </p>
  );
}
