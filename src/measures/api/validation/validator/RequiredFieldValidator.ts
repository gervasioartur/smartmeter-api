import { InvalidDataError } from '@/measures/domain/error/InvalidDataError';

export class RequiredFieldValidator<T> {
  private fieldName: string;
  private fieldValue: T;
  private errorMessage: string;

  constructor(fieldName: string, fieldValue: T) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.errorMessage = `O campo '${this.fieldName}' é obrigatório.`;
  }

  validate(): Error | undefined {
    switch (typeof this.fieldValue) {
      case 'string':
        if (
          this.fieldValue === '' ||
          this.fieldValue === null ||
          this.fieldValue === undefined
        )
          return new InvalidDataError(this.fieldName, this.errorMessage);
        break;
    }
  }
}
