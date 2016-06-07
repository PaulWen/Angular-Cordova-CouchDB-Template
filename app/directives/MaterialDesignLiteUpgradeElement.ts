/**
 * This directive gets used declare that in an HTML element MDL Elements
 * are used. By adding this directive the MDL component handler
 * gets called automatically as soon as the page got loaded/updated
 * and renders all the MDL elements.
 */


import {Directive, AfterViewInit} from '@angular/core';
declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})
export class MDL implements AfterViewInit {
    ngAfterViewInit() {
        componentHandler.upgradeDom();
    }
}