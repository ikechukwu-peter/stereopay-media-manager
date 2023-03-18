import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // sets /api/v1 to all routes
  app.setGlobalPrefix("api/v1");

  // enable cors for all domain
  app.enableCors();

  // prisma hook
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // instantiate validation pipe globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const PORT = parseInt(configService.get("PORT")) ?? 4000;

  console.log(PORT);

  await app.listen(PORT);
}
bootstrap();
