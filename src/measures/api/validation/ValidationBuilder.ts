import { Validator } from './validator/_Validator';
import { Base64Validator } from './validator/Base64Validator';
import { MeasureTypeValidator } from './validator/MeasureTypeValidator';
import { RequiredFieldValidator } from './validator/RequiredFieldValidator';

export class ValidationBuilder<T> {
  private readonly fieldName: string;
  private readonly fieldValue: T;
  private readonly validators: Validator[] = [];

  constructor(fieldName: string, fieldValue: T) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
  }

  static of<T>(params: {
    fieldName: string;
    fieldValue: T;
  }): ValidationBuilder<T> {
    return new ValidationBuilder<T>(params.fieldName, params.fieldValue);
  }

  required(): ValidationBuilder<T> {
    this.validators.push(
      new RequiredFieldValidator<T>(this.fieldName, this.fieldValue),
    );
    return this;
  }

  base64(): ValidationBuilder<T> {
    this.validators.push(new Base64Validator(this.fieldValue as string));
    return this;
  }

  measureType(): ValidationBuilder<T> {
    this.validators.push(new MeasureTypeValidator(this.fieldValue as string));
    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
