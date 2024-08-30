import { InvalidDataError } from '@/measures/domain/error/InvalidDataError';

export class Base64Validator {
  private fieldValue: string;
  private errorMessage: string;

  constructor(fieldValue: string) {
    this.fieldValue = fieldValue;
    this.errorMessage = "O campo 'image' deve ser do tipo base64.";
  }

  validate(): Error | undefined {
    const regexPattern = new RegExp(
      /^data:image\/(?:png|jpeg|webp|heic|heif)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
    );
    if (!regexPattern.test(this.fieldValue))
      return new InvalidDataError('image', this.errorMessage);
    return undefined;
  }
}
