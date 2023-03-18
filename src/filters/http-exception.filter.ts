import {
  ExceptionFilter, // Importing the ExceptionFilter interface from NestJS.
  Catch, // Importing the Catch decorator from NestJS.
  ArgumentsHost, // Importing the ArgumentsHost interface from NestJS.
  Logger, // Importing the Logger class from NestJS.
  HttpException, // Importing the HttpException class from NestJS.
} from "@nestjs/common";
import { OperationStatus } from "./../media/types/media-response.types"; // Importing a custom enum.

@Catch(HttpException) // Decorating the class with the Catch decorator to indicate that it will handle HttpException.
export class HttpExceptionFilter implements ExceptionFilter {
  // Implementing the ExceptionFilter interface.
  private readonly logger = new Logger(); // Creating a logger instance.

  catch(exception: HttpException, host: ArgumentsHost) {
    // Implementing the catch method from the ExceptionFilter interface.
    const ctx = host.switchToHttp(); // Getting the HTTP context from the ArgumentsHost.
    const response = ctx.getResponse(); // Getting the response object from the context.
    const status = exception.getStatus(); // Getting the HTTP status code from the HttpException.
    const message = exception.message; // Getting the error message from the HttpException.
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
