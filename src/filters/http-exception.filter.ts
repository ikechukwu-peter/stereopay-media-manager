import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
} from "@nestjs/common";
import { OperationStatus } from "./../media/types/media-response.types";
@Catch(HttpException) // Decorating the class with the Catch decorator to indicate that it will handle HttpException.
export class HttpExceptionFilter implements ExceptionFilter {
  // Implementing the ExceptionFilter interface.
  private readonly logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    // Implementing the catch method from the ExceptionFilter interface.
    const ctx = host.switchToHttp(); // Getting the HTTP context from the ArgumentsHost.
    const response = ctx.getResponse(); // Getting the response object from the context.
    const status = exception.getStatus(); // Getting the HTTP status code from the HttpException.
    const message = Array.isArray(exception.getResponse()["message"])
      ? exception.getResponse()["message"][0]
      : exception.message; // Getting the error message from the HttpException.
    const error = exception.name; // Getting the error name from the HttpException.

    this.logger.log(`${JSON.stringify({ error, message, status })}`); // Logging the error details.

    response.status(status).json({
      // Setting the HTTP status code and sending the response as JSON.
      status: OperationStatus.ERROR, // Setting a custom status property.
      message: message,
      data: {},
    });
  }
}
