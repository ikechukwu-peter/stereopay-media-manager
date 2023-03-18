import { Test, TestingModule } from "@nestjs/testing";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { OperationStatus } from "./types/media-response.types";
import { PrismaService } from "./../prisma/prisma.service";

describe("MediaController", () => {
  let controller: MediaController;
  let mediaController: MediaController;
  let mediaService: MediaService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [{ provide: MediaService, useValue: {} }],
    }).compile();

    controller = module.get<MediaController>(MediaController);

    prisma = new PrismaService();
    mediaService = new MediaService(prisma);
    mediaController = new MediaController(mediaService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getMediasBySearch", () => {
    it("should return an array of media", async () => {
      const result = [
        {
          id: "67eb6236-f78d-402f-a044-69b4d2909873",
          type: "audio",
          url: "https://gaudio.com",
          status: "active",
          title: "Sulaa",
          description: "The souls music",
          createdAt: "2023-03-18T15:13:00.176Z",
          updatedAt: "2023-03-18T15:13:00.176Z",
          deletedAt: null,
        },
      ];

      const testData = {
        status: OperationStatus.SUCCESS,
        message: "Media retrieved successfully",
        data: result,
      };
      jest
        .spyOn(mediaService, "getMediasBySearch")
        .mockImplementation(async () => testData);

      expect(
        await mediaController.getMediasBySearch({ query: "Sulaa" }),
      ).toEqual(testData);
    });
  });

  describe("getMediasPaginated", () => {
    it("should return an array of media", async () => {
      const result = [
        {
          id: "67eb6236-f78d-402f-a044-69b4d2909873",
          type: "audio",
          url: "https://gaudio.com",
          status: "active",
          title: "Sulaa",
          description: "The souls music",
          createdAt: "2023-03-18T15:13:00.176Z",
          updatedAt: "2023-03-18T15:13:00.176Z",
          deletedAt: null,
        },
      ];

      const testData = {
        status: OperationStatus.SUCCESS,
        message: "Media retrieved successfully",
        data: result,
      };
      jest
        .spyOn(mediaService, "getMediasPaginated")
        .mockImplementation(async () => testData);

      expect(
        await mediaController.getMediasPaginated({ page: 1, perPage: 2 }),
      ).toEqual(testData);
    });
  });
});
