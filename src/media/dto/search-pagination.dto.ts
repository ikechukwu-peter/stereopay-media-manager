import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class searchPaginationDTO {
  @Type(() => Number)
  @IsInt()
  page: number;

  @Type(() => Number)
  @IsInt()
  perPage: number;
}
