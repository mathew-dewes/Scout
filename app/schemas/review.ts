import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const reviewSchema = z.object({
    body: z.string().min(1, 'Review is required').max(200, 'Review must be 200 characters or less'),
    placeId: z.custom<Id<'places'>>(),
    rating:z.number().min(1, 'Rating is required'),

})