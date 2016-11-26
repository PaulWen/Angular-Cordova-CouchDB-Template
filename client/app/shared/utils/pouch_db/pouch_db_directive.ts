import {Directive, Input, Self} from "@angular/core";
import {NgModel} from "@angular/forms";
import {PouchDbDocument} from "./pouch_db_document";

/**
 * This class gets used for locking and unlocking @link{PouchDbDocument} objects.
 * If a @link{PouchDbDocument} object is locked, the value can not be changed.
 * This gets used for making sure that "ngModel" is not always updating the model on each key stroke
 * nor that the model overrides the input field if it gets currently edited.
 */
@Directive({
    selector: '[pouchDbModel][ngModel]',
    host: {
        '(focus)': 'lock()',
        '(blur)': 'unlock()'
    }
})
export class PouchDbModel<DocumentType extends PouchDbDocument<DocumentType>> {
    @Input('pouchDbModel') pouchDbDocument: PouchDbDocument<DocumentType>;

    private ngModel: NgModel;

    constructor(@Self() ngModel: NgModel) {
        this.ngModel = ngModel;
    }

    /**
     * This function locks the according @link{PouchDbDocument} object so that
     * it is not possible anymore to change the value of this object.
     */
    private lock() {
        // lock the model
        this.pouchDbDocument.lock();
    }

    /**
     * This function unlocks the according @link{PouchDbDocument} object so that
     * it is again possible to change the value of this object.
     * In addition to that it updates the @link{PouchDbDocument} object to the current value
     * of this view.
     */
    private unlock() {
        // remove the lock on the model
        this.pouchDbDocument.unlock();

        // write the current value of the view to the model
        this.ngModel.viewToModelUpdate(this.ngModel.viewModel);
    }

}