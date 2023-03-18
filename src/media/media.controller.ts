// Import required modules and dependencies from NestJS framework and other modules
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Patch,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { searchPaginationDTO } from "./dto/search-pagination.dto";
import { createMediaDTO } from "./dto/create-media.dto";
import { searchDTO } from "./dto/search.dto";
import { MediaResponseType } from "./types/media-response.types";
import { ParseUUIDPipe } from "@nestjs/common/pipes";

// Define a controller class for media API
@Controller("media")
export class MediaController {
  // Constructor takes an instance of MediaService
  constructor(private readonly mediaService: MediaService) {}

  // Endpoint method for getting paginated media list
  @Get()
  async getMediasPaginated(
    @Query() searchPaginationDto: searchPaginationDTO,
  ): Promise<MediaResponseType> {
    return this.mediaService.getMediasPaginated(searchPaginationDto);
  }

  // Endpoint method for getting media list by search query
  @Get("/search")
  async getMediasBySearch(
    @Query() searchDto: searchDTO,
  ): Promise<MediaResponseType> {
    return this.mediaService.getMediasBySearch(searchDto);
  }

  // Endpoint method for getting media by id
  @Get(":id")
  async getMediaById(
    @Param("id", new ParseUUIDPipe()) id: string,
  ): Promise<MediaResponseType> {
    try {
      return this.mediaService.media({ id });
    } catch (error) {
      return error;
    }
  }

  // Endpoint method for creating a new media
  @Post()
  @HttpCode(201)
  async createMedia(
    @Body()
    mediaData: createMediaDTO,
  ): Promise<MediaResponseType> {
    return this.mediaService.createMedia(mediaData);
  }

  // Endpoint method for updating an existing media
  @Patch(":id")
  async updateMedia(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateMediaDto: Partial<createMediaDTO>,
  ): Promise<MediaResponseType> {
    return this.mediaService.updateMedia({
      where: { id },
      updateMediaDto,
    });
  }

  // Endpoint method for deleting a media by id
  @Delete(":id")
  // @HttpCode(204)
  async deleteMedia(
    @Param("id", new ParseUUIDPipe()) id: string,
  ): Promise<MediaResponseType> {
    return this.mediaService.deleteMedia({
      where: { id },
    });
  }
}
