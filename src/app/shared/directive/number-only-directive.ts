import { Directive, ElementRef, HostListener, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {

  constructor(
      private _el: ElementRef,
      @Self() private ngControl: NgControl,        
      ) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    this.ngControl.control.setValue(this._el.nativeElement.value)
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}