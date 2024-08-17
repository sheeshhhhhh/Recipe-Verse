import { SetURLSearchParams } from "react-router-dom"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
}

const PaginationNav = ({
    searchParams,
    setSearchParams
} : PaginationProps) => {

  const page = parseInt(searchParams.get('page') || '1')

  const handleChangePagination = (command: 'increment' | 'decrement') => {
    
    if(command === 'increment') {
      setSearchParams(`page=${page + 1}`)
    } else if(command === 'decrement') {
      if(page <= 1) return
      setSearchParams(`page=${page - 1}`)
    }
  }
    
  return (
    <div>
      <Pagination>
        <PaginationContent>

          <PaginationPrevious 
          className="cursor-pointer"
          onClick={() => handleChangePagination('decrement')} />

          <PaginationItem >
            <PaginationLink  
            className="cursor-pointer"
            onClick={() => handleChangePagination('decrement')} >
              {page - 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="cursor-pointer" isActive>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink 
            className="cursor-pointer"
            onClick={() => handleChangePagination('increment')}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationNext 
          className="cursor-pointer"
          onClick={() => handleChangePagination('increment')} />

        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationNav