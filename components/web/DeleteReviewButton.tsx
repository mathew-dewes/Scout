"use client"

import { deleteReviewAction } from "@/app/actions";
import { Button } from "../ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function DeleteReviewButton({reviewId}:{reviewId: Id<"reviews">}){

  const [isPending, startTransition] = useTransition();
    const [isDeleting, setIsDeleting] = useState(false)
    
    
    const handleSubmit = () =>{
            setIsDeleting(true)
        startTransition(async()=>{
            await deleteReviewAction({reviewId})
        });
    }

      const disabled = isPending || isDeleting;


    return (
        <form>
      <input type="hidden" name="reviewId" value={reviewId} />
      <Button disabled={disabled} onClick={handleSubmit} variant={"destructive"}>
             {disabled ? (
                                        <>
                                        <Loader2 className="size-4 animate-spin"/>
                                        <span>Removing...</span>
                                        </>
                                    ): (<span>Delete</span>)}
      </Button>
        </form>
              
    )
}