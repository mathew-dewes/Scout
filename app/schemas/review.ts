import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const reviewSchema = z.object({
    body: z.string().min(3),
    placeId: z.custom<Id<'places'>>(),
    rating:z.number(),

})