import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function RegionList(){
return (
    <div className="mt-20">
           <div className="text-center pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Regions</h1>
            <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Find popular activities, restaurants & Cafes around New Zealand!</p>
        </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card  className="pt-0">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                        className="rounded-t-lg object-cover"
                        src={
                            "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                        alt="Post image"
                        fill
                        />
                    </div>

                    <CardContent>
                        <Link href={`/blog/`}>
                        <h1 className="text-2xl font-bold hover:text-primary">grgrgg</h1>
                        </Link>

                        <p className="text-muted-foreground line-clamp-3">grgrg</p>
                    </CardContent>

                    <CardFooter>
                        <Link className={buttonVariants({
                            className:"w-full"
                        })} href={`/blog/`}>Read more
                        </Link>
                    </CardFooter>
                </Card>
    </div>

    </div>

)
}