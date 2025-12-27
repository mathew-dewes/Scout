"use client"

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {



    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href={'/'}>
                    <h1 className="text-3xl font-bold">Scout
                    </h1></Link>
                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/'}>Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/blog'}>Explore</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/create'}>Account</Link>

                </div>


            </div>

            <div className="flex items-center gap-2">
   <ThemeToggle />

            </div>

        </nav>
    )
}