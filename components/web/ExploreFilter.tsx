"use client"

import { categories, locations } from "@/lib/helpers/constants";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ExploreFilters(){

    const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();



  function updateParam(key: string, value: string){
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "All"){
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`${pathname}?${params.toString()}`, {scroll: false})
  }
    return (
        <div className="flex gap-5">
            <Select 
            value={searchParams.get('location') ?? ""}
            onValueChange={(value) => updateParam('location', value)}
            >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Region</SelectLabel>
          {locations.map((location, key)=>{
            return <SelectItem key={key} value={location}>{location}</SelectItem>
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
            <Select
            value={searchParams.get('category') ?? ""}
            onValueChange={(value) => updateParam('category', value)}
            >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {categories.map((cat, key)=>{
            return <SelectItem key={key} value={cat}>{cat}</SelectItem>
          })}

        </SelectGroup>
      </SelectContent>
    </Select>
        </div>

    )
}


