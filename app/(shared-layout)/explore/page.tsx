
import ExploreFilters from "@/components/web/ExploreFilter";
import { Metadata } from "next";
import { Suspense } from "react";
import { PlaceList } from "./_components/PlaceList";
import { PlaceListSkeleton } from "./_components/PlaceListSkeleton";


export const metadata: Metadata = {
title: "Blog | Next.JS Tutorial",
description: "Read our latest articles and insights",
category: "Web development",
authors: [{name: "Mathew Dewes"}]
};

type SearchParams = {
    page: number;
    location?: string;
    category?: string;
}

export default async function ExplorePage({searchParams} :
    {searchParams: Promise<SearchParams>}
 ){

    return (
     <div className="py-12">
        <div className="text-center pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Explore</h1>
            <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Find popular activities, restaurants & Cafes around New Zealand!</p>
        </div>
        <div className="mb-8">
            <p className="mb-2">Fitlers:</p>
            <Suspense>
   <ExploreFilters/>
            </Suspense>
   
        </div>
  
        <Suspense fallback={<PlaceListSkeleton/>}>
        <PlaceList
        searchParams={searchParams}
      
      />
        </Suspense>
        
      



     </div>
    )
}