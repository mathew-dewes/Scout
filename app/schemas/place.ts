import z from "zod"

export const placeSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(500),
    location:z.string().max(500),
    category:z.string(),
    image: z.instanceof(File),
    status:z.string()
})