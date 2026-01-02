import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const categories = ['food', 'cafe', 'restaurant', 'bar',  'event', 'attraction', 'activity', 'outdoor', 'shopping', 'accommodation'];



// Todo, create new category object and map over the data, see below  

// const categories = [
//   {title: 'Food & Drink', href: '/explore?category=Food+%26+Drink'},
//   {title: 'Cafes', href: '/explore?category=Cafes'},
//   {title: 'Restaurants', href: '/explore?category=Restaurants'},
//   {title: 'Bars & Pubs', href: '/explore?category=Bars+%26+Pubs'},
//   {title: 'Events & Venues', href: '/explore?category=Events+%26+Venues'},
//   {title: 'Attractions', href: '/explore?category=Attractions'},
//   {title: 'Activities & Experiences', href: '/explore?category=Activities+%26+Experiences'},
//   {title: 'Outdoor & Nature', href: '/explore?category=Outdoor+%26+Nature'},
//   {title: 'Shopping & Retail', href: '/explore?category=Shopping+%26+Retail'},
//   {title: 'Accommodation', href: '/explore?category=Accommodation'},
  
// ]

export default function HomePage(){
  return (
    <div className="py-12">
         <div className="text-center pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Explore</h1>
            <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Find popular activities, restaurants & Cafes around New Zealand!</p>
        </div>

<div>
  <Carousel   opts={{
    slidesToScroll: 3,
  }} className="w-full">
<CarouselContent>
    {categories.map((cat)=>{
    return (
      <CarouselItem  className="basis-full sm:basis-1/2 lg:basis-1/3" key={cat}>
    <div >
<Card className="pt-0">

  <div className="relative h-48 w-full overflow-hidden">

        <Image 
                            className="rounded-t-lg object-cover"
                            src={`/categories/${cat}.jpg`} 
                            alt="Post image"
                            fill
                            />
  </div>

  <CardContent>
         <Link href={`/explore/${123}`}>
                                 <h1 className="text-2xl font-bold hover:text-primary capitalize text-center">{cat}</h1>
         </Link>

                 <div className="mt-3">
                                     <div className="flex items-center gap-0.5">
                                 <MapPin size={17} className="text-red-400" />
                                 <p className="font-medium">dwdwd - <span className="font-light text-sm">fefe</span></p>
                                     </div>
                      
            <p className="text-muted-foreground line-clamp-3 mt-1">fef</p>
                                 </div>
  </CardContent>

  
                      <CardFooter>
                          <Link className={buttonVariants({
                              className:"w-full"
                          })} href={`/explore/fefe`}>Read more
                          </Link>
                      </CardFooter>
</Card>
    </div>
      </CarouselItem>

    )
  })}
</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
  </Carousel>


</div>
    </div>
  )
}