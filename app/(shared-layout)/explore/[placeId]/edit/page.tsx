
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import EditPlaceForm from "./_components/EditPlaceForm";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface PlaceIdRouteProps {
    params: Promise<{ placeId: Id<"places"> }>
}

export default async function EditPlaceRoute({ params }: PlaceIdRouteProps) {
    const { placeId } = await params;
    const place = await fetchQuery(api.places.getPlaceById, { placeId });

    if (!place) {
        return (
            <div>
                <h1 className="text-6xl font-extrabold text-red-500 py-20">No place found</h1>
            </div>
        )
    };

    console.log(place);
    
    
    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Edit Place</h1>
                <p className="text-xl text-muted-foreground pt-4">Share your thoughts with the world</p>
            </div>

            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Place</CardTitle>
                    <CardDescription>Create a new place</CardDescription>
                </CardHeader>
                <CardContent>
                   <EditPlaceForm place={place} placeId={placeId}/>
                </CardContent>
            </Card>

        </div>
    )
}