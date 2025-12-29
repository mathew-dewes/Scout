"use client"

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function Navbar() {
        const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();



    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href={'/'}>
                    <h1 className="text-3xl font-bold flex gap-1">Scout
                        <span className="text-primary">NZ</span>
                    </h1></Link>
                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/'}>Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/explore'}>Explore</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/create'}>Create</Link>

                </div>


            </div>

            <div className="flex items-center gap-2">
                {/* <div className="hidden md:block mr-2">
                    <SearchInput/>
                </div> */}
                {isLoading ? null : isAuthenticated ? (
                    <Button onClick={()=> authClient.signOut({
                        fetchOptions:{
                            onSuccess:()=>{
                                toast.success("Logged out successfully!");
                                router.push('/');
                            },
                            onError: (error)=>{
                                toast.error(error.error.message)
                            }
                        }
                    })}>Logout</Button>
                ) : <>
                    <Link className={buttonVariants()} href={'/auth/sign-up'}>Sign up</Link>
                    <Link className={buttonVariants({ variant: "outline" })} href={'/auth/login'}>Login</Link>
                    </>}
                    <ThemeToggle />

            </div>

        </nav>
    )
}