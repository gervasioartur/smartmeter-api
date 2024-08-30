import { InvalidDataError } from '@/measures/domain/error/InvalidDataError';

export class MeasureTypeValidator {
  private fieldValue: string;
  private errorMessage: string;

  constructor(fieldValue: string) {
    this.fieldValue = fieldValue;
    this.errorMessage =
      "O campo 'measure type' é inválido! Deve se preechiodo por WATER ou GAS.";
  }

  validate(): Error | undefined {
    if (this.fieldValue != 'WATER' && this.fieldValue != 'GAS')
      return new InvalidDataError('image', this.errorMessage);
    return undefined;
  }
}
