import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { authComponent } from "./auth";

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