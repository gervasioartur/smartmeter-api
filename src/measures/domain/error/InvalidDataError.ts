export class InvalidDataError extends Error {
  private fieldName: string;

  constructor(fieldName: string, message: string) {
    super(message);
    this.fieldName = fieldName;
    this.name = 'INVALID_DATA';
  }
}
