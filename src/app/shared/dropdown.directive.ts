import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') is_open_dropdown_menu = false;

  @HostListener('click') toggleDropdown() {
    this.is_open_dropdown_menu = !this.is_open_dropdown_menu;
  }
  constructor() { }

}
