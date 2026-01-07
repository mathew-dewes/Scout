import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function ExplorePagination({currentPage, hasNextPage}:
    {currentPage: number, hasNextPage: boolean} 
){

      const params = new URLSearchParams();
    return (
         <div className="mt-5">
        <Pagination>
          <PaginationContent>
         {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`?${params.toString()}&page=${currentPage - 1}`}
                  />
                </PaginationItem>
              )}
            <PaginationItem>
              <PaginationLink href={"#"} isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
               {hasNextPage && (
                  <PaginationItem>
                    <PaginationNext
                      href={`?${params.toString()}&page=${currentPage + 1}`}
                    />
                  </PaginationItem>
                )}
          </PaginationContent>
        </Pagination>
                </div>
    )
}
