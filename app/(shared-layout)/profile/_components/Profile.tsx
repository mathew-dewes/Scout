
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchQuery } from "convex/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";


export default async function Profile(){

    const token = await getToken();

    const [user, userId] = await Promise.all([
        fetchQuery(api.auth.getCurrentUser, {}, {token}), 
        fetchQuery(api.auth.getUserId, {}, {token})])

    if (!user || !userId) return
    


    return (
           

   
           <div className="flex items-center gap-4 mt-10">
                <Avatar className="size-30 shrink-0">
                    <AvatarImage
                        src={`https://avatar.vercel.sh/MathewDewes`}
                        alt="Hello"
                    />

                    <AvatarFallback>
                        Loading

                    </AvatarFallback>

                </Avatar>
                <div className="flex-1 space-y-1">

               
                        <h1 className="font-semibold text-2xl">{user.name}</h1>
                        <p>User ID: {userId}</p>
            
                  
                    
                    <div className="mt-2">
     <h2 className="font-semibold">Bio:</h2>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ad?</p>
                    </div>
               


                    <Separator className="mt-3" />
                </div>
            </div>

   

    )
}