import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    places: defineTable({
        name: v.string(),
        location: v.string(),
        status: v.string(),
        category: v.string(),
        description: v.string(),
        address: v.optional(v.string()),
        imageStorageId: v.optional(v.id('_storage')),

    })
    .index('by_location', ['location'])
    .index('by_category', ["category"])
    .index('by_location_category', ['location', 'category'])
,
    tasks: defineTable({
        isCompleted: v.boolean(),
        text: v.string(),
        
    })
});


