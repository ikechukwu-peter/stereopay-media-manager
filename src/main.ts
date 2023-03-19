import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { PrismaService } from "./prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // sets /api/v1 to all routes
  app.setGlobalPrefix("api/v1");

  // enable cors for all domain
  app.enableCors();

  const prismaService = app.get(PrismaService);
  // This ensures that the application shuts down gracefully without any pending queries or transactions.
  await prismaService.enableShutdownHooks(app);

  // instantiate validation pipe globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // instantiate exception filter globally
  // only added to transform the response to the specified format rather than default nestjs format
  app.useGlobalFilters(new HttpExceptionFilter());

  const PORT = parseInt(configService.get("PORT")) ?? 4000;

  await app.listen(PORT);
}
bootstrap();
