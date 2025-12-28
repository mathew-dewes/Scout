import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage(){
  return (
    <div>
        <Link className={buttonVariants()} href={'/'}>Hello World</Link>
        <p className="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, vero? Debitis eius accusantium aliquid facilis necessitatibus rerum excepturi nihil aut!</p>
    </div>
  )
}