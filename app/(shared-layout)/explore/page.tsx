import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ExploreFilters from "@/components/web/ExploreFilter";
// import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
// import { Suspense } from "react";


export const metadata: Metadata = {
title: "Blog | Next.JS Tutorial",
description: "Read our latest articles and insights",
category: "Web development",
authors: [{name: "Mathew Dewes"}]
}

export default function ExplorePage(){

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
  
        {/* <Suspense fallback={<SkeletonLoadingUi/>}> */}
        <PlaceList/>
        {/* </Suspense> */}



     </div>
    )
}


async function PlaceList(){
   "use cache";
   cacheLife("hours");
   cacheTag('place');
    const places = await fetchQuery(api.places.getPlaces);

    return (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {places?.map((place)=>(
                <Card key={place._id} className="pt-0">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                        className="rounded-t-lg object-cover"
                        src={place.imageUrl ?? 
                            "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                        alt="Post image"
                        fill
                        />
                    </div>

                    <CardContent>
                        <Link href={`/explore/${place._id}`}>
                        <h1 className="text-2xl font-bold hover:text-primary">{place.name}</h1>
                        </Link>

                        <p className="text-muted-foreground line-clamp-3">{place.description}</p>
                    </CardContent>

                    <CardFooter>
                        <Link className={buttonVariants({
                            className:"w-full"
                        })} href={`/explore/${place._id}`}>Read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}

        </div>
    )
}


// function SkeletonLoadingUi(){
//     return (
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {[...Array(3)].map((_, i)=> (
//                     <div className="flex flex-col space-y-3" key={i}>
//                         <Skeleton className="h-48 w-full round-xl"/>
//                         <div className="space-y-2 flex flex-col">
//                             <Skeleton className="h-6 w-3/4"/>
//                             <Skeleton className="h-4 w-full"/>
//                             <Skeleton className="h-4 w-2/3"/>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//     )
// }