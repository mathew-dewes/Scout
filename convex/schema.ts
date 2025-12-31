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

    }),

    tasks: defineTable({
        isCompleted: v.boolean(),
        text: v.string(),
        
    })
});


