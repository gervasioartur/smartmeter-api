export class HttpError {
  private readonly error_code: string;
  private readonly error_description: string;

  constructor(error: Error) {
    this.error_code = error.name;
    this.error_description = error.message;
  }
}
