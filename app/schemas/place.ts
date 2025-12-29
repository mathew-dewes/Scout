import z from "zod"

export const placeSchema = z.object({
    name: z.string().min(3).max(50),
    location: z.string().max(500),
    status: z.string(),
    category: z.string(),
    description: z.string().min(10).max(500),
    image: z.instanceof(File),

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