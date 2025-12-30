import { locations } from "@/lib/helpers/constants";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export default function ExploreFilters(){
    return (
        <div className="flex gap-5">
            <Select>
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
            <Select>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">All</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>

    )
}


