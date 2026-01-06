import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FeaturedPlaceByLocation } from "./FeaturedPlaceByLocation";



const regions = [
  {title: 'Northland', href: '/explore?category=Food+%26+Drink', src: '/locations/northland.jpg', desc: 'Discover local food and drink spots, from quick bites to signature local flavours.'},
  {title: 'Auckland', href: '/explore?category=Cafes', src: '/locations/auckland.jpg', desc: 'Find cosy cafés serving great coffee, brunch, sweet treats, and relaxed local atmospheres.'},
  {title: 'Waikato', href: '/explore?category=Restaurants', src: '/locations/waikato.jpg', desc: 'Explore top restaurants offering diverse cuisines, casual dining, and memorable sit-down meals.'},
  {title: 'Bay Of Plenty', href: '/explore?category=Bars+%26+Pubs', src: '/locations/bop.jpg', desc: 'Uncover bars and pubs with great drinks, live music, and social local vibes.'},
  {title: 'Gisborne', href: '/explore?category=Events+%26+Venues', src: '/locations/gisborne.jpg', desc: 'Discover upcoming events, venues, festivals, gigs, and local happenings worth attending.'},
  {title: 'Hawkes Bay', href: '/explore?category=Attractions', src: '/locations/hawkesBay.jpg', desc: 'Discover popular attractions, landmarks, and must-see places loved by locals and visitors.'},
  {title: 'Taranaki', href: '/explore?category=Activities+%26+Experiences', src: '/locations/taranaki.jpg', desc:'Find fun activities, tours, and experiences that showcase the best of the area'},
  {title: 'Manawatū-Whanganui', href: '/explore?category=Outdoor+%26+Nature', src: '/locations/manawatu.jpg', desc: 'Explore parks, beaches, walks, and natural spaces perfect for adventure or relaxation.'},
  {title: 'Wellington', href: '/explore?category=Shopping+%26+Retail', src: '/locations/wellington.jpg', desc: 'Browse local shops, markets, and retail stores offering unique finds and essentials.'},
  {title: 'Tasman', href: '/explore?category=Accommodation', src: '/locations/tasman.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.'},
  {title: 'Nelson', href: '/explore?category=Accommodation', src: '/locations/nelson.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.'},
  {title: 'Marlborough', href: '/explore?category=Accommodation', src: '/locations/marlborough.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.'},
  {title: 'West Coast', href: '/explore?category=Accommodation', src: '/locations/westCoast.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.'},
  {title: 'Canterbury', href: '/explore?category=Accommodation', src: '/locations/canterbury.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.'},
  {title: 'Otago', href: '/explore?category=Accommodation', src: '/locations/otago.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.'},
  {title: 'Southland', href: '/explore?category=Accommodation', src: '/locations/southland.jpg', desc: 'Find places to stay including hotels, motels, lodges, and unique local accommodation.'},
  
]

export default async function RegionList(){
return (
    <div>
           <div>
  <Carousel   opts={{
    slidesToScroll: 3,
  }} className="w-full">
<CarouselContent>
    {regions.map((cat)=>{
    return (
      <CarouselItem  className="basis-full sm:basis-1/2 lg:basis-1/3" key={cat.title}>
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
                                           
                                                           <FeaturedPlaceByLocation location={cat.title} />
                                                     
                                 
                                                       </div>
  </CardContent>

  
                      <CardFooter>
                          <Link className={buttonVariants({
                              className:"w-full"
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

    </div>

)
}