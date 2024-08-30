import { ValidationComposite } from '../validation/ValidationComposite';
import { Validator } from '../validation/validator/_Validator';

export abstract class BaseController<T> {
  protected buildValidators(request: T): Validator[] {
    return [];
  }

  protected validate(request: T): Error | undefined {
    const validators: Validator[] = this.buildValidators(request);
    return new ValidationComposite(validators).validate();
  }
}
