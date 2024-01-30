import { Validator, Validators } from '@angular/forms';

export interface InputSettings {
  [fieldName: string]: {
    type: string;
    label: string;
    dimension: number; //se input deve occupare tutto (100) o metà (50) popup
    initialContent: string;
    validators: Validators;
    options?: string[];
  };
}
