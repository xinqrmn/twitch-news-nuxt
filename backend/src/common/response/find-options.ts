import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, IsEmpty } from 'class-validator';


type SortDirection = 'ASC' | 'DESC'
type SortCriteria = [string, SortDirection]
export class FindOptions {
  @ApiPropertyOptional({ type: Number, default: 20 })
  @IsOptional()
  @IsInt()
  @Max(100)
  public readonly itemsPerPage?: number

  @ApiPropertyOptional({ type: Number, default: 1 })
  @IsOptional()
  @IsInt()
  public readonly currentPage?: number

  @ApiPropertyOptional({ type: Number, default: 1 })
  @IsOptional()
  @IsInt()
  public readonly totalPages?: number

  @ApiPropertyOptional({ type: Array, default: [] })
  @IsOptional()
  public readonly sortBy?: SortCriteria[]

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  public readonly totalItems?: number
}
