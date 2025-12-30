"use server";

import z from "zod";

import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { updateTag } from "next/cache";
import { placeSchema } from "./schemas/place";
import { Id } from "@/convex/_generated/dataModel";

export async function createPlaceAction(values: z.infer<typeof placeSchema>) {

    try {
        const parsed = placeSchema.safeParse(values);

        if (!parsed.success) {
            throw new Error('Something went wrong')
        };

        const token = await getToken();
        const imageUrl = await fetchMutation(
            api.places.generateImageUploadUrl,
            {},
            { token }
        );

        const uploadResult = await fetch(imageUrl,
            {
                method: 'POST',
                body: parsed.data.image,
                headers: {
                    "Content-Type": parsed.data.image!.type
                }
            }
        );

        if (!uploadResult.ok) {
            return {
                error: "Failed to upload image"
            }
        };

        const { storageId } = await uploadResult.json();

        await fetchMutation(api.places.createPlace, {
            name: parsed.data.name,
            description:parsed.data.description,
            location:parsed.data.location,
            category:parsed.data.category,
            imageStorageId:storageId,
            status:"bob"


        }, { token });

 
    } catch {
        return {
            error: "Failed to create post"
        }
    }

       updateTag('place');

    redirect('/explore');



}


export  async function deletePlaceAction(formData: FormData){
const placeId = formData.get("placeId") as Id<"places">;
const imageStorageId = formData.get("imageStorageId") as Id<"_storage">;
const token = await getToken();
 await fetchMutation(api.places.deletePlace, {placeId},{ token } );
 await fetchMutation(api.images.deleteById, {storageId: imageStorageId});
 updateTag('place');
 redirect('/explore')
}

