import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dropdown } from 'src/app/objects/dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() dropdown: Dropdown = {
    placeholder: 'ciao2',
    options: ['opzione 1', 'opzione 2', 'opzione 3'],
  };
  @Input() formType?: boolean;
  @Input() readOnly: boolean = false;
  @Output() optionEmitter = new EventEmitter<string>();

  isClicked: boolean = false;
  optionSelected: boolean = false;

  onDropdownClick() {
    if (!this.readOnly) {
      this.isClicked = !this.isClicked;
    }
  }

  optionIsSelected(i: number) {
    this.dropdown.placeholder = this.dropdown.options[i];
    this.isClicked = !this.isClicked;
    this.optionSelected = true;

    console.log(this.dropdown);
    this.optionEmitter.emit(this.dropdown.options[i]);
  }
}
