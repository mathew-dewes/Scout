
import CategorySlider from "./(home)/_components/CategorySlider";
import RegionSlider from "./(home)/_components/RegionSlider";



export default function HomePage(){
  return (
    <div className="py-12">
         <div className="text-center pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Categories</h1>
            <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Find popular activities, restaurants & Cafes around New Zealand!</p>
        </div>
        
             
        <CategorySlider/>
                     



 <div className="text-center pb-12 mt-20">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Regions</h1>
            <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Find popular activities, restaurants & Cafes around New Zealand!</p>
        </div>
   
<RegionSlider/>
    



    </div>
  )
}