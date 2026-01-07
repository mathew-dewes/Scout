import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { FeaturedPlaceByCategory } from "./FeaturedPlaceByCategory";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";



const categoryCardsProps = [
  { title: 'Food & Drink', href: '/explore?category=Food+%26+Drink', src: '/categories/food.jpg', desc: 'Discover local food and drink spots, from quick bites to signature local flavours.' },
  { title: 'Cafes', href: '/explore?category=Cafes', src: '/categories/cafe.jpg', desc: 'Find cosy cafés serving great coffee, brunch, sweet treats, and relaxed local atmospheres.' },
  { title: 'Restaurants', href: '/explore?category=Restaurants', src: '/categories/restaurant.jpg', desc: 'Explore top restaurants offering diverse cuisines, casual dining, and memorable sit-down meals.' },
  { title: 'Bars & Pubs', href: '/explore?category=Bars+%26+Pubs', src: '/categories/bar.jpg', desc: 'Uncover bars and pubs with great drinks, live music, and social local vibes.' },
  { title: 'Events & Venues', href: '/explore?category=Events+%26+Venues', src: '/categories/event.jpg', desc: 'Discover upcoming events, venues, festivals, gigs, and local happenings worth attending.' },
  { title: 'Attractions', href: '/explore?category=Attractions', src: '/categories/attraction.jpg', desc: 'Discover popular attractions, landmarks, and must-see places loved by locals and visitors.' },
  { title: 'Activities & Experiences', href: '/explore?category=Activities+%26+Experiences', src: '/categories/activity.jpg', desc: 'Find fun activities, tours, and experiences that showcase the best of the area' },
  { title: 'Outdoor & Nature', href: '/explore?category=Outdoor+%26+Nature', src: '/categories/outdoor.jpg', desc: 'Explore parks, beaches, walks, and natural spaces perfect for adventure or relaxation.' },
  { title: 'Shopping & Retail', href: '/explore?category=Shopping+%26+Retail', src: '/categories/shopping.jpg', desc: 'Browse local shops, markets, and retail stores offering unique finds and essentials.' },
  { title: 'Accommodation', href: '/explore?category=Accommodation', src: '/categories/accommodation.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.' },

]

export default async function CategorySlider() {

  return (
    <div>
      <Carousel opts={{
        slidesToScroll: 3,
      }} className="w-full">
        <CarouselContent>
          {categoryCardsProps.map((cat) => {
            return (
              <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3" key={cat.title}>
                <div >
                  <Card className="pt-0">

                    <div className="relative h-48 w-full overflow-hidden">

                      <Image
                        className="rounded-t-lg object-cover"
                        src={cat.src}
                        alt="Post image"
                        fill
                      />
                    </div>

                    <CardContent>
                      <Link href={cat.href}>
                        <h1 className="text-2xl font-bold hover:text-primary capitalize text-center">{cat.title}</h1>
                      </Link>

                      <div className="mt-3">


                        <p className="text-muted-foreground line-clamp-3 text-center mt-1">{cat.desc}</p>
                      </div>
                      <div className="mt-3">
                        <Suspense fallback={
                          <div className="flex items-center gap-2">
                              <Loader2 className="size-6 animate-spin"/>
                            <p>Loading...</p>
                          </div>
                        }>
      <FeaturedPlaceByCategory category={cat.title} />
                        </Suspense>
          
                    
                    

                      </div>
                    </CardContent>


                    <CardFooter>
                      <Link className={buttonVariants({
                        className: "w-full"
                      })} href={cat.href}>View places
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
  )
}