import {
    AbstractControlDirective, ControlContainer, ControlValueAccessor,
    Validator, ValidatorFn, AsyncValidatorFn
} from "@angular/forms";


export declare abstract class NgControl extends AbstractControlDirective {
      protected _parent: ControlContainer;
      name: string;
      valueAccessor: ControlValueAccessor;
      protected  _rawValidators: Array<Validator|ValidatorFn>;
      validator: ValidatorFn;
      protected _rawAsyncValidators: Array<Validator|ValidatorFn>;
      asyncValidator: AsyncValidatorFn;

      abstract viewToModelUpdate(newValue: any): void;
}


export default NgControl;