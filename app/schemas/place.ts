import { categories, locations } from "@/lib/helpers/constants"
import z from "zod"

export const placeSchema = z.object({
    name: z.string().min(3).max(50),
    location: z.enum(locations, "Please select a location"),
    address:z.optional(z.string().min(3).max(50)).or(z.literal("")),
    category: z.enum(categories, "Please select a category" ),
    description: z.string().min(10).max(500),
    image: z.instanceof(File).optional(),

})

// export default defineSchema({
//     places: defineTable({
//         name: v.string(),
//         location: v.string(),
//         status: v.string(),
//         category: v.string(),
//         description: v.string(),
//         imageStorageId: v.optional(v.id('_storage')),

//     })
// })