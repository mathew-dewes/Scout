import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";



export const getReviewsByPlaceId = query({
    args:{ placeId: v.id('places')},
    handler: async (ctx, args) =>{
        const data = await ctx.db.query('reviews')
        .filter((q)=> q.eq(q.field('placeId'), args.placeId))
        .order('desc')
        .collect();

        return data;
    }
});


export const createReview = mutation({
    args: {placeId: v.id('places'), body: v.string(), rating: v.number()},
    handler: async (ctx, args) =>{
        const user = await authComponent.safeGetAuthUser(ctx);

            if (!user){
                throw new ConvexError("Not authenticated");
            }
                  return await ctx.db.insert('reviews', 
            {
                placeId: args.placeId,
                body: args.body,
                authorId: user._id,
                authorName: user.name,
                rating: args.rating
            }
        )
    }
});

export const deleteReview = mutation({
    args:{reviewId: v.id('reviews')},
    handler: async(ctx, args) =>{
      const user = await authComponent.safeGetAuthUser(ctx);

        if (!user) {
            throw new ConvexError("Not authenticated");
        }

        await ctx.db.delete('reviews', args.reviewId);
    }
})