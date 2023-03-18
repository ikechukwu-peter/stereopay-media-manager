import { MediaType, Status } from "@prisma/client";
import { IsString, IsUrl, IsNotEmpty, IsOptional } from "class-validator";

export class createMediaDTO {
  @IsOptional()
  @IsString()
  type: MediaType;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  status?: Status;
}
