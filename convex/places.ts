import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";


export const getPlaces = query({
    args: {
        paginationOpts: paginationOptsValidator,
        location: v.optional(v.string()),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { location, category } = args;

        let query;


        if (location && category) {
            query = ctx.db.query('places').withIndex('by_location_category',
                ((q) => q.eq('location', location).eq('category', category)
                ));

        } else if (location) {
            query = query = ctx.db.query('places').withIndex('by_location',
                ((q) => q.eq('location', location)
                ))
        } else if (category) {
            query = query = ctx.db.query('places').withIndex('by_category',
                ((q) => q.eq('category', category)
                ))
        } else {
            query = ctx.db.query('places');
        }

        const result = await query
            .order("desc")
            .paginate(args.paginationOpts);

    const placesWithImages = await Promise.all(
      result.page.map(async (place) => ({
        ...place,
        imageUrl: place.imageStorageId
          ? await ctx.storage.getUrl(place.imageStorageId)
          : null,
      }))
    );

        return {
      places: placesWithImages,
      continueCursor: result.continueCursor,
      isDone: result.isDone,
    };

    }
});

export const getPlaceById = query({
    args: { placeId: v.id('places') },
    handler: async (ctx, args) => {
        const place = await ctx.db.get(args.placeId);

        if (!place) {
            return null
        }

        const resolvedImageUrl = place.imageStorageId !== undefined ? await ctx.storage.getUrl(place.imageStorageId) : null;
        return {
            ...place,
            imageUrl: resolvedImageUrl
        }

    }
});

export const getFeaturedPlaceByCategory = query({
    args:{category: v.string()},
    handler: async(ctx, args)=> {
        const places = await ctx.db
        .query('places')
        .withIndex('by_category', ((q)=>(q.eq('category', args.category))))
        .collect();

        if (!places.length) return null;

        const rated = places.filter(p => (p.averageRating ?? 0) > 0);

        if (rated.length){
            return rated.reduce((a, b)=>(
                (b.averageRating ?? 0) > (a.averageRating ?? 0) ? b : a
            ));
        }

        return places.reduce((a, b)=>
        b._creationTime > a._creationTime ? b : a)
    }
})

interface searchResultTypes {
    _id: string,
    title: string,
    body: string
}

export const searchPlaces = query({
    args: {
        term: v.string(),
        limit: v.number()
    },
    handler: async (ctx, args) => {
        const limit = args.limit;
        const results: Array<searchResultTypes> = [];
        const seen = new Set();

        const pushDocs = async (docs: Array<Doc<'places'>>) => {
            for (const doc of docs) {
                if (seen.has(doc._id)) continue

                seen.add(doc._id);
                results.push({
                    _id: doc._id,
                    title: doc.name,
                    body: doc.description
                });

                if (results.length >= limit) break;
            }

        };

        const placeNameMatches = await ctx.db.query('places')
            .withSearchIndex("search_name",
                (q) => q.search('name', args.term)).take(limit);

        await pushDocs(placeNameMatches);

             if (results.length < limit){
        
        const descriptionMatches = await ctx.db.query("places").
        withSearchIndex('search_description', (q) => q.search('description', args.term)).
        take(limit);

        await pushDocs(descriptionMatches);
      }


        return results;


    }
})

export const createPlace = mutation({
    args: {
        name: v.string(),
        location: v.string(),
        address: v.optional(v.string()),
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
            address: args.address,
            status: args.status,
            imageStorageId: args.imageStorageId
        });

        return place;
    },
});

export const editPlace = mutation({
    args: {
        placeId: v.id("places"),
        name: v.string(),
        location: v.string(),
        address: v.optional(v.string()),
        status: v.string(),
        category: v.string(),
        description: v.string(),
        imageStorageId: v.optional(v.id("_storage"))
    },
    handler: async (ctx, args) => {

        const user = await authComponent.safeGetAuthUser(ctx);

        if (!user) {
            throw new ConvexError("Not authenticated");
        }

        await ctx.db.patch(args.placeId, {
            name: args.name,
            description: args.description,
            category: args.category,
            location: args.location,
            address: args.address,
            status: args.status,
            imageStorageId: args.imageStorageId
        });


    },
});

export const deletePlace = mutation({
    args: { placeId: v.id('places') },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);

        if (!user) {
            throw new ConvexError("Not authenticated");
        }

        await ctx.db.delete("places", args.placeId);

    }

})

export const generateImageUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);

        if (!user) {
            throw new ConvexError("Not authenticated");
        }

        return await ctx.storage.generateUploadUrl();
    }
});