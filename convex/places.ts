import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";


export const getPlaces = query({
    args:{},
    handler: async(ctx)=>{
        const places = await ctx.db.query('places').order("desc").collect();
        
        return await Promise.all(
            places.map(async(place)=>{
                const resolvedImageUrl = place.imageStorageId !== undefined ? await ctx.storage.getUrl(place.imageStorageId) : null;
                return {
                    ...place,
                    imageUrl: resolvedImageUrl
                }
            })
        )
    }
});

export const getPlaceById = query({
    args:{placeId: v.id('places')},
    handler: async (ctx, args)=>{
        const place = await ctx.db.get(args.placeId);

        if (!place){
            return null
        }

            const resolvedImageUrl = place.imageStorageId !== undefined ? await ctx.storage.getUrl(place.imageStorageId) : null;
                return {
                    ...place,
                    imageUrl: resolvedImageUrl
                }

    }
})

export const createPlace = mutation({
    args: {
        name: v.string(),
        location: v.string(),
        status: v.string(),
        category: v.string(),
        description: v.string(),
        imageStorageId: v.id("_storage") 
    },
    handler: async (ctx, args) => {

        const user = await authComponent.safeGetAuthUser(ctx);

        if (!user) {
            throw new ConvexError("Not authenticated");
        }

        const place = await ctx.db.insert('places', {
            name: args.name,
            description: args.description,
            category: args.category,
            location: args.location,
            status: args.status,
            imageStorageId: args.imageStorageId
        });

        return place;
    },
});

export const generateImageUploadUrl = mutation({
  args:{},
  handler: async(ctx)=>{
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user){
        throw new ConvexError("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  }
});