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
    args: {
        placeId: v.id('places'), 
        body: v.string(), 
        rating: v.number()},
    handler: async (ctx, args) =>{

        const place = await ctx.db.get(args.placeId);
        const user = await authComponent.safeGetAuthUser(ctx);

        if (!place) throw new ConvexError('Place not found')
        if (!user) throw new ConvexError("Not authenticated");
            
        // Insert review
        await ctx.db.insert('reviews', 
            {
                placeId: args.placeId,
                body: args.body,
                authorId: user._id,
                authorName: user.name,
                rating: args.rating
            });

        const reviews = await ctx.db
      .query("reviews")
      .filter(q => q.eq(q.field("placeId"), args.placeId))
      .collect();


            const total = reviews.reduce((sum, r) => sum + r.rating, 0);
            const count = reviews.length;
            const average = total / count;


            await ctx.db.patch(args.placeId, {
                reviewCount: count,
                averageRating: Number(average.toFixed(1))
            })
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