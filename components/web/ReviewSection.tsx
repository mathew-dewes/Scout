"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { reviewSchema } from "@/app/schemas/review";
import { Rating } from "./Rating";
import DeleteReviewButton from "./DeleteReviewButton";


export default function ReviewSection(props: {
  preLoadedReviews: Preloaded<typeof api.reviews.getReviewsByPlaceId>;
}){
    const params = useParams<{placeId: Id<'places'>}>();
    const data = usePreloadedQuery(props.preLoadedReviews)
    const [isPending, startTransition] = useTransition()

    const createReview = useMutation(api.reviews.createReview);
    
        const form = useForm({
            resolver: zodResolver(reviewSchema)
            , defaultValues: {
                body: "",
                placeId: params.placeId,
                rating: 0,
            }
        });

 function onSubmit(data: z.infer<typeof reviewSchema>){
        startTransition(async ()=>{
      try {
            await createReview(data);
            form.reset()
            toast.success('Comment posted')
        } catch {
            toast.error('Failed to create post')
        }
        })
  
    };


    if (data === undefined){
        return <p>Loading...</p>
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <MessageSquare className="size-5"/>
                <h2 className="text-xl font-bold">{data.length} Reviews</h2>
            </CardHeader>

            <CardContent className="space-y-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <Controller name="body" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Write review:</FieldLabel>
                                    <Textarea aria-invalid={fieldState.invalid} placeholder="Share your thoughts" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                         <Controller 
                         name="rating" 
                         control={form.control}
                

                            render={({ field, fieldState }) => (
                                <Field>
                                         <FieldLabel>Rating:</FieldLabel>
                                <Rating value={field.value} onChange={field.onChange}/>
                               
                           
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />

                           <Button className="mt-5" disabled={isPending}>
                            {isPending ? (
                                <>
                                <Loader2 className="size-4 animate-spin"/>
                                <span>Loading...</span>
                                </>
                            ): (<span>Add Review</span>)}
                        </Button>

                </form>

                {data?.length > 0 && <Separator/>}

                <section className="space-y-6">
                    {data?.map((review)=>
                        <div className="flex gap-4" key={review._id}>
                                <Avatar className="size-10 shrink-0">
                                    <AvatarImage 
                                    src={`https://avatar.vercel.sh/${review.authorName}`}
                                    alt={review.authorName}
                                    />

                                    <AvatarFallback>
                                        {review.authorName.slice(0,2).toUpperCase()}

                                    </AvatarFallback>

                                </Avatar>

                                <div className="flex-1 space-y-1">

                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-sm">{review.authorName}</p>
                                        <p className="text-muted-foreground text-xs">{new Date(review._creationTime).toLocaleDateString('en-NZ')}</p>
                                    </div>
                                    <div className="mt-2">
            <Rating size={15} value={review.rating}/>
                                    </div>
                        
                                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed mt-1">{review.body}</p>
                                    <div className="flex mt-3">
                                    <DeleteReviewButton reviewId={review._id}/>
                                    </div>
                         
                                    <Separator className="mt-3"/>
                                </div>
                            
                        </div>
                    )}
                  

                </section>

    

             
            </CardContent> 
        </Card>
    )
}