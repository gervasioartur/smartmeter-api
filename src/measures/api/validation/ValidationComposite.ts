import { Validator } from './validator/_Validator';

export class ValidationComposite implements Validator {
  private readonly validators: Validator[];

  constructor(validators: Validator[]) {
    this.validators = validators;
  }

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate();
      if (error !== undefined) {
        return error;
      }
    }
  }
}
