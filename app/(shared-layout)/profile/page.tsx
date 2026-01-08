import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";


export default function ProfilePage() {
    return (
        <div>
            <h1>Profile</h1>
            <div className="flex items-center gap-4 mt-10">
                <Avatar className="size-30 shrink-0">
                    <AvatarImage
                        src={`https://avatar.vercel.sh/MathewDewes`}
                        alt="Hello"
                    />

                    <AvatarFallback>
                        fefef

                    </AvatarFallback>

                </Avatar>
                <div className="flex-1 space-y-1">

               
                        <h1 className="font-semibold text-2xl">Mathew Dewes</h1>
            
                  
                    
                    <div className="mt-2">
     <h2 className="font-semibold">Bio:</h2>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, ad?</p>
                    </div>
               


                    <Separator className="mt-3" />
                </div>
            </div>

        </div>
    )
}