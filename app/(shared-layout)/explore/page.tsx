
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


export default async function ExplorePage({searchParams} :
    {searchParams: Promise<{page?: string; location: string | undefined, category: string | undefined}>}
 ){

   const { page: pageStr, location, category} = await searchParams;
     const page = Math.max(Number(pageStr ?? 1), 1);
    return (
     <div className="py-12">
        <div className="text-center pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Explore</h1>
            <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Find popular activities, restaurants & Cafes around New Zealand!</p>
        </div>
        <div className="mb-8">
            <p className="mb-2">Fitlers:</p>
      <ExploreFilters/>
        </div>
  
        <Suspense fallback={<PlaceListSkeleton/>}>
        <PlaceList
        page={page}
        location={location}
        category={category}
      
      />
        </Suspense>
        
        
        {/* <div className="mt-5">
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious  href={`?${params.toString()}&page=${page - 1}`} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href={"#"} isActive>{page}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href={`?${params.toString()}&page=${page + 1}`} />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        </div> */}



     </div>
    )
}





