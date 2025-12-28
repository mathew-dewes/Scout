import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage(){
  return (
    <div>
        <Link className={buttonVariants()} href={'/'}>Hello World</Link>
        <p className="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, vero? Debitis eius accusantium aliquid facilis necessitatibus rerum excepturi nihil aut!</p>
    
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
    </div>
  )
}