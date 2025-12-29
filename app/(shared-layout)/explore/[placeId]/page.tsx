import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import DeletePlaceButton from "@/components/web/DeletePlaceButton";


interface PlaceIdRouteProps {
    params: Promise<{ placeId: Id<"places"> }>
}


export async function generateMetadata({params}: PlaceIdRouteProps): Promise<Metadata>{

    const {placeId} = await params;
    const place = await fetchQuery(api.places.getPlaceById,{ placeId});

    if (!place){
        return {
            title: "Place not found"
        }
    }

    return {
        title: place.name,
        description: place.description
    }
}

export default async function PlacePage({params}: PlaceIdRouteProps){
    const { placeId} = await params;
     const place = await fetchQuery(api.places.getPlaceById, {placeId});

     if (!place) {
        return (
            <div>
                <h1 className="text-6xl font-extrabold text-red-500 py-20">No place found</h1>
            </div>
        )
     }

    return (
              <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
            <Link className={buttonVariants({
                variant: "outline", className: 'mb-4'
            })} href={'/explore'}>
                <ArrowLeft className="size-4" />
                Back to Explore
            </Link>

            <div className="relative w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm">
                <Image
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    src={place.imageUrl ?? "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt={place.name}
                    fill />
            </div>

            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">{place.name}</h1>
                <div className="flex gap-3 justify-end">
                    <Button variant={'secondary'}>Edit</Button>
                    <DeletePlaceButton placeId={placeId} imageStorageId={place.imageStorageId}/>
    
                </div>
            
                {/* <div className="flex items-center gap-2">
                       <p className="text-sm text-muted-foreground">Posted on: {new Date(post._creationTime).toLocaleDateString('en-NZ')}</p>

                       {userId && <PostPresence roomId={post._id} userId={userId}/>}

                 
                </div> */}
             
            </div>


            <Separator className="my-8" />

            <p className="texl-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{place.description}</p>

            <Separator className="my-8" />

            {/* <CommentSection preLoadedComments={preLoadedComments} /> */}



        </div>
    )
}