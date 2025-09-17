type SortDirection = 'ASC' | 'DESC'
type SortCriteria = [string, SortDirection]

export type Pagination =  {
  itemsPerPage?: number
  currentPage?: number
  totalPages?: number
  sortBy?: SortCriteria[]
  totalItems?: number
} 
