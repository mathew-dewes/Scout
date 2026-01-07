
import PlaceGrid from "./PlaceGrid";



type SearchParams = {
    page: number;
    location?: string;
    category?: string;
}

export async function PlaceList({ searchParams }: {
  searchParams: Promise<SearchParams>
}) {

  const params = new URLSearchParams();
  
   const { page: pageStr, location, category} = await searchParams;
        const page = Math.max(Number(pageStr ?? 1), 1);

    return (
        <div>
<PlaceGrid page={page} category={category} location={location} currentParams={params.toString()}/>
{/* <ExplorePagination currentPage={page} hasNextPage={hasNextPage}/> */}
        </div>
       
    )
}