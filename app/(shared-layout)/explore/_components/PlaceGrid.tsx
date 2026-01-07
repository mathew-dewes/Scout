import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Rating } from "@/components/web/Rating";
import {  Id } from "@/convex/_generated/dataModel";
import { MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type placeResult =  {
    imageUrl: string | null;
    _id: Id<"places">;
    _creationTime: number;
    address?: string | undefined;
    imageStorageId?: Id<"_storage"> | undefined;
    averageRating?: number | undefined;
    reviewCount?: number | undefined;
    name: string;
    location: string;
    status: string;
    category: string;
    description: string;
}

export default async function PlaceGrid({places}:
{places: placeResult[]})
{

"use cache";
return (
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
    )
}