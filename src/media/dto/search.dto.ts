import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class searchDTO {
  @Type(() => String)
  @IsString()
  query: string;
}
