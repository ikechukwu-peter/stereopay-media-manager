import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma/prisma.service";
import { MediaService } from "./media/media.service";
import { MediaController } from "./media/media.controller";
import { MediaModule } from "./media/media.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MediaModule,
  ],
  controllers: [MediaController],
  providers: [PrismaService, MediaService],
})
export class AppModule {}
