export interface ErrorResponse {
  statusCode: string;
  message: string;
  error: string;
  response: {
    data: {
      error: string;
    };
  };
}
