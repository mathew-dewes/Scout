import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Rating } from "@/components/web/Rating";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExplorePagination from "./ExplorePagination";


export default async function PlaceGrid({page, location, category, currentParams}:
{page: number, location?: string, category?: string, currentParams: string})
{
  const PAGE_SIZE = 6;
  let cursor: string | null = null;
  let placesResult;

    for (let i = 1; i <= page; i++) {
    placesResult = await fetchQuery(api.places.getPlaces, {
      paginationOpts: {
        numItems: PAGE_SIZE + 1,
        cursor,

      },
      location,
      category,
    });

    cursor = placesResult.continueCursor;
  }
  if (!placesResult) {
    return null;
  }
  
const places = placesResult.places.slice(0, PAGE_SIZE);
const hasNextPage = placesResult.places.length > PAGE_SIZE;

if (places.length === 0){
  return <p>0 results found. Please try another search query</p>
}


return (
         <div>
   <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {places?.map((place) => (
                        <Card key={place._id} className="pt-0">
                            <div className="relative h-48 w-full overflow-hidden">
                                <div>
                                    <Badge className="absolute top-3 right-3 z-10" variant="secondary">
                                        <Tag size={20} />
                                        {place.category}</Badge>
                                </div>
        
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
        
                                <div className="mt-3">
                                    <div className="flex items-center gap-0.5">
                                        <MapPin size={17} className="text-red-400" />
                                        <p className="font-medium">{place.location} - <span className="font-light text-sm">{place.address}</span></p>
                                    </div>
        
                                    <p className="text-muted-foreground line-clamp-3 mt-1">{place.description}</p>
                                </div>
                                <div className="mt-2 flex gap-2 items-center">
                                <Rating readOnly={true} value={place.averageRating} />
                                <p className="text-muted-foreground line-clamp-3">{place.averageRating ?? 0}/5 ({place.reviewCount ?? 0})</p>
                                </div>
                            
        
        
                            </CardContent>
        
                            <CardFooter>
                                <Link className={buttonVariants({
                                    className: "w-full"
                                })} href={`/explore/${place._id}`}>Read more
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
        
                </div>
                <ExplorePagination currentPage={page} hasNextPage={hasNextPage} params={currentParams}/>
         </div>
      
    )
}