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
    AsyncValidatorFn
} from "@angular/forms";
import {Logger} from "../logger";

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

    @Input('disabled') isDisabled: boolean;
    @Input('pouchDbModel') model: any;

    @Output('pouchDbModelChange') update = new EventEmitter();

    constructor(element: ElementRef, renderer: Renderer,
                @Optional() @Self() @Inject(NG_VALIDATORS) validators: Array<Validator|ValidatorFn>,
                @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<Validator|AsyncValidatorFn>) {
        this.validators = validators || [];
        this.asyncValidators = asyncValidators || [];
    }

    /**
     * This function gets called whenever any input variable changes.
     * If the value of the HTML tag this directive is attached to changes,
     * and the user is not currently editing the content of this HTML tag,
     * the value of this HTML tag gets updated with the new value.
     *
     * @param changes describes the changes
     */
    private ngOnChanges(changes: SimpleChanges) {
       Logger.debug("UPDATE VIEW (if user is not editing this HTML tag)");
       Logger.debug(changes);
    }

    /**
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
        this.update.emit("VALUE");

    }

}