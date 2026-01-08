
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProfile(){
    return (
         <div className="mt-10">
            <div className="flex gap-4">
    <div className="bg-gray-300 size-30 mt-1 rounded-full"/>
               <div className="mt-1 space-y-1 w-2/3">
                <p className="font-semibold text-xl">Loading...</p>
                <Skeleton className="h-4 w-1/10 mt-5"/>
                <Skeleton className="h-4 w-2/3"/>
    
            </div>
        
            </div>
     
   

        </div>
       
    )
}