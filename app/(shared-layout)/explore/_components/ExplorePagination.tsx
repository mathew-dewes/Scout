import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function ExplorePagination({currentPage, hasNextPage, params}:
    {currentPage: number, hasNextPage: boolean, params: string} 
){
    return (
         <div className="mt-5">
        <Pagination>
          <PaginationContent>
         {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious scroll={false} 
                    href={`?${params}&page=${currentPage - 1}`}
                  />
                </PaginationItem>
              )}
            <PaginationItem>
              <PaginationLink className="pointer-events-none" href={"#"} isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
               {hasNextPage && (
                  <PaginationItem>
                    <PaginationNext scroll={false}
                      href={`?${params}&page=${currentPage + 1}`}
                    />
                  </PaginationItem>
                )}
          </PaginationContent>
        </Pagination>
                </div>
    )
}
