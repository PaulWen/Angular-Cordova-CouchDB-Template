import {
    Directive,
    Input,
    Output,
    EventEmitter,
    Optional,
    Inject,
    Self,
    Renderer,
    ElementRef,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import {
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS,
    Validator,
    ValidatorFn,
    AsyncValidatorFn, ControlValueAccessor, DefaultValueAccessor, CheckboxControlValueAccessor,
    SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor
} from "@angular/forms";
import {Logger} from "../logger";
import {NumberValueAccessor} from "@angular/forms/src/directives/number_value_accessor";

@Directive({
    selector: '[pouchDbModel]:not([formControlName]):not([formControl])',
    host: {
        '(mouseenter)': 'onSubmit()'
    }
})
export class PouchDbModel implements OnChanges {
    private element: ElementRef;
    private renderer: Renderer;
    private validators: Array<Validator|ValidatorFn>;
    private asyncValidators: Array<Validator|AsyncValidatorFn>;

    /** gets used for accessing and setting the value of the input field */
    private valueAccessor: ControlValueAccessor;

    @Input('disabled') isDisabled: boolean;
    @Input('pouchDbModel') model: any;

    @Output('pouchDbModelChange') update = new EventEmitter();

    constructor(element: ElementRef, renderer: Renderer,
                @Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator|ValidatorFn>,
                @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<Validator|AsyncValidatorFn>,
                valueAccessors: ControlValueAccessor[]) {
        this.validators = validators || [];
        this.asyncValidators = asyncValidators || [];
        this.valueAccessor = this.selectValueAccessor(valueAccessors);
        Logger.debug(this.model);
    }

    /**
     * Sync Model to View
     *
     * This function gets called whenever any input variable changes.
     * If the value of the HTML tag this directive is attached to changes,
     * and the user is not currently editing the content of this HTML tag,
     * the value of this HTML tag gets updated with the new value.
     *
     * @param changes describes the changes
     */
    public ngOnChanges(changes: SimpleChanges) {
       Logger.debug("UPDATE VIEW (if user is not editing this HTML tag)");
       Logger.debug(changes);
    }

    /**
     * Sync View to Model
     *
     * This function updates the value in the model with the current value in the HTML tag
     * this directive is attached to.
     *
     * This function should get called whenever the the value in the HTML tag is supposed to be submitted.
     * (e.g. the HTML tag is no longer focused)
     */
    private onSubmit() {
        Logger.debug("UPDATE MODEL");

        // TODO check that any of the validators throw an error
        // TODO if any validator throws an error set the right class!


        // TODO for accessing the value and also changing the value a value accessor should be used
        // TODO toing so also makes it later on possible to use this directive with any component
        // TODO (especially the NgMaterial components)
        this.update.emit("hallo");

    }

    /**
     * Method originally implemented by: https://github.com/angular/angular/blob/33340dbbd156d45e50b886f05095551f41c38600/modules/%40angular/forms/src/directives/shared.ts
     * I modified it so that this method does not depend on any other functions anymore.
     *
     * @param valueAccessors
     * @return {any}
     */
    private selectValueAccessor(valueAccessors: ControlValueAccessor[]): ControlValueAccessor {
        let defaultAccessor: ControlValueAccessor;
        let builtinAccessor: ControlValueAccessor;
        let customAccessor: ControlValueAccessor;

        valueAccessors.forEach((valueAccessor: ControlValueAccessor) => {
            if (valueAccessor.constructor === DefaultValueAccessor) {
                defaultAccessor = valueAccessor;

            } else if (
                valueAccessor.constructor === CheckboxControlValueAccessor ||
                valueAccessor.constructor === NumberValueAccessor ||
                valueAccessor.constructor === SelectControlValueAccessor ||
                valueAccessor.constructor === SelectMultipleControlValueAccessor ||
                valueAccessor.constructor === RadioControlValueAccessor
            ) {
                if (builtinAccessor !== undefined && builtinAccessor !== null)
                    Logger.error('More than one built-in value accessor matches form control with');
                builtinAccessor = valueAccessor;

            } else {
                if (customAccessor !== undefined && customAccessor !== null)
                    Logger.error('More than one custom value accessor matches form control with');
                customAccessor = valueAccessor;
            }
        });

        if (customAccessor !== undefined && customAccessor !== null) return customAccessor;
        if (builtinAccessor !== undefined && builtinAccessor !== null) return builtinAccessor;
        if (defaultAccessor !== undefined && defaultAccessor !== null) return defaultAccessor;

        Logger.error('No valid value accessor for form control with');
        return null;
    }


}