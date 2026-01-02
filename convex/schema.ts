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
    .searchIndex('search_name', {searchField: 'name'})
    .searchIndex('search_description', {searchField: 'description'}),

    reviews: defineTable({
        placeId: v.id('places'),
        authorId: v.string(),
        authorName: v.string(),
        body: v.string(),
        rating: v.number()

    })

});


