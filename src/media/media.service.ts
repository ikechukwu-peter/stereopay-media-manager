// Import required modules
import {
  BadRequestException,
  InternalServerErrorException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Prisma, Status } from "@prisma/client";
import { isObjectEmpty } from "../utils/is-object-empty.utilities";
import { PrismaService } from "./../prisma/prisma.service";
import { createMediaDTO } from "./dto/create-media.dto";
import { searchPaginationDTO } from "./dto/search-pagination.dto";
import { searchDTO } from "./dto/search.dto";
import {
  MediaResponseType,
  OperationStatus,
} from "./types/media-response.types";
import { generateUUID } from "./../utils/generate-uuid.utils";

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  constructor(private prisma: PrismaService) {}

  // Get media by unique input, returns a single media or null
  async media(
    userWhereUniqueInput: Prisma.MediaWhereUniqueInput,
  ): Promise<MediaResponseType | null> {
    const media = await this.prisma.media.findUnique({
      where: userWhereUniqueInput,
    });

    if (!media) {
      // If no media found, throw a BadRequestException with error message
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `No media found with the specified Id, ${userWhereUniqueInput.id}`,
        data: {},
      });
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: `No media found with the specified Id, ${userWhereUniqueInput.id}`,
        data: {},
      });
    }
    // Return a success response with the media data
    return {
      status: OperationStatus.SUCCESS,
      message: "Operation successfull",
      data: media,
    };
  }

  // Get medias paginated, returns multiple medias
  async getMediasPaginated(
    searchPaginationDto: searchPaginationDTO,
  ): Promise<MediaResponseType> {
    // number of items to skip
    const skip = (searchPaginationDto.page - 1) * searchPaginationDto.perPage;
    try {
      const medias = await this.prisma.media.findMany({
        skip,
        take: searchPaginationDto.perPage,
        where: { status: Status.active },
        orderBy: { createdAt: "desc" },
      });

      // Return a success response with the medias data
      return {
        status: OperationStatus.SUCCESS,
        message: "Operation successful",
        data: medias,
      };
    } catch (error) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
      // If any error occurred while retrieving data, throw a BadRequestException with error message
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
    }
  }

  // Get medias by search query, returns multiple medias
  async getMediasBySearch(searchDto: searchDTO): Promise<MediaResponseType> {
    const { query } = searchDto;
    try {
      const medias = await this.prisma.media.findMany({
        where: {
          status: Status.active,
          OR: [
            {
              title: { contains: query },
            },
            {
              description: { contains: query },
            },
          ],
        },

        orderBy: { createdAt: "desc" },
      });

      // Return a success response with the medias data
      return {
        status: OperationStatus.SUCCESS,
        message: "Operation successful",
        data: medias,
      };
    } catch (error) {
      // If any error occurred while retrieving data, throw an InternalServerErrorException with error message
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
      throw new InternalServerErrorException({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
    }
  }

  // This is an asynchronous function called `createMedia`
  // It takes a single argument `data` of type `Prisma.MediaCreateInput`
  // This function returns a Promise that resolves to an object of type `MediaResponseType`
  async createMedia(data: Prisma.MediaCreateInput): Promise<MediaResponseType> {
    // This line checks if the `data` object is empty or not
    // If it's empty, the function throws a `BadRequestException` with a message `No valid field`

    if (!isObjectEmpty({ ...data })) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `No valid field`,
        data: {},
      });
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: `No valid field`,
        data: {},
      });
    }

    try {
      // This line creates a new media object using the `prisma.media.create` method
      // The `generateUUID` function generates a new UUID for the media object
      // The `...data` spreads the `data` object and adds it to the new media object
      const newMedia = await this.prisma.media.create({
        data: {
          id: generateUUID(),
          ...data,
        },
      });

      // This block of code runs if the `newMedia` object is created successfully
      // It returns an object of type `MediaResponseType` with a `SUCCESS` status and a message `Created successfully`
      // The `data` property of the response object contains the newly created media object
      if (newMedia) {
        return {
          status: OperationStatus.SUCCESS,
          message: "Created successfully",
          data: newMedia,
        };
      }
    } catch (error) {
      // This block of code runs if there is an error creating the `newMedia` object
      // It logs the error to the console and throws a `BadRequestException` with a message that includes the error `meta.cause`
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
    }
  }

  // This is an asynchronous function called `updateMedia`
  // It takes an object with two properties: `where` and `updateMediaDto`
  // The `where` property is of type `Prisma.MediaWhereUniqueInput`
  // The `updateMediaDto` property is of type `Partial<createMediaDTO>`
  // This function returns a Promise that resolves to an object of type `MediaResponseType`
  async updateMedia(params: {
    where: Prisma.MediaWhereUniqueInput;
    updateMediaDto: Partial<createMediaDTO>;
  }): Promise<MediaResponseType> {
    // This line destructures the `where` and `updateMediaDto` properties from the `params` object
    const { where, updateMediaDto } = params;

    // This line checks if the `updateMediaDto` object is empty or not
    // If it's empty, the function throws a `BadRequestException` with a message `Nothing to update`
    if (!isObjectEmpty(updateMediaDto)) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `Nothing to update`,
        data: {},
      });
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: `Nothing to update`,
        data: {},
      });
    }

    try {
      // This line updates the media object using the `prisma.media.update` method
      // The `where` property is used to find the media object to update
      // The `updateMediaDto` property contains the updates to apply to the media object
      const updatedMedia = await this.prisma.media.update({
        where,
        data: updateMediaDto,
      });

      // This block of code runs if the `updatedMedia` object is updated successfully
      // It returns an object of type `MediaResponseType` with a `SUCCESS` status and a message `Update successfully`
      // The `data` property of the response object contains the updated media object
      if (updatedMedia) {
        return {
          status: OperationStatus.SUCCESS,
          message: "Update successfully",
          data: updatedMedia,
        };
      }
    } catch (error) {
      // This block of code runs if there is an error updating the `updatedMedia` object
      // It throws a `BadRequestException` with a message that includes the error `meta.cause`
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
    }
  }

  // This is an asynchronous function called `deleteMedia`
  // It takes an object with one property: `where`
  // The `where` property is of type `Prisma.MediaWhereUniqueInput`
  // This function returns a Promise that resolves to an object of type `MediaResponseType`
  async deleteMedia(params: {
    where: Prisma.MediaWhereUniqueInput;
  }): Promise<MediaResponseType> {
    // This line destructures the `where` property from the `params` object
    const { where } = params;

    try {
      // This line updates the media object using the `prisma.media.update` method
      // The `where` property is used to find the media object to update
      // The `data` property contains the updates to apply to the media object
      // In this case, the status of the media object is set to `inactive`
      // and the `deletedAt` property is set to the current date and time
      await this.prisma.media.update({
        where,
        data: { status: Status.inactive, deletedAt: new Date() },
      });

      // This block of code runs if the media object is updated successfully
      // It returns an object of type `MediaResponseType` with a `SUCCESS` status and a message `Update successfully`
      // The `data` property of the response object is an empty object
      return {
        status: OperationStatus.SUCCESS,
        message: "Deleted successfully",
        data: {},
      };
    } catch (error) {
      // This block of code runs if there is an error updating the media object
      // It throws a `BadRequestException` with a message that includes the error `meta.cause`
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: `${error?.meta?.cause}`,
        data: {},
      });
    }
  }
}
