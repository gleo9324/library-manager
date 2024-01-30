import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Dropdown } from 'src/app/objects/dropdown';
import { InputSettings } from 'src/app/objects/input-settings';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  // data type
  @Input() inputType!: string;

  form!: FormGroup;
  // settings for form controls
  input: InputSettings = {};
  // if form is opened to edit data => true
  isEdit: boolean = false;
  // id of data element to edit
  id?: string;

  // dropdown element
  dropdown: Record<string, Dropdown> = {};
  //if input fields are readOnly and if edit button needs to be displayed
  isReadOnly: boolean[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // listens to settings changes (input) thanks to inputUpToDate observable
    this.formService.inputUpToDate$.subscribe((input) => {
      this.input = input;
      // creates formControls with settings from input
      const formControls: { [key: string]: AbstractControl } = {};
      for (const fieldName in this.input) {
        formControls[fieldName] = new FormControl(
          this.input[fieldName].initialContent,
          this.input[fieldName].validators
        );
        // if type = dropdown, sets placeholder and options
        if (this.input[fieldName].type == 'dropdown') {
          this.dropdown[fieldName] = {
            placeholder: this.input[fieldName].label,
            options: this.input[fieldName].options ?? [],
          };
          // if type is date, parse into Date
        } else if (this.input[fieldName].type == 'date') {
          formControls[fieldName] = new FormControl(
            this.formatDate(new Date(this.input[fieldName].initialContent)),
            this.input[fieldName].validators
          );
        }

        //inizialize isReadOnly to false if it's not an edit popup
        const keys = Object.keys(this.input);
        if (!this.isEdit) {
          for (let i = 0; i < keys.length; i++) {
            this.isReadOnly[i] = false;
          }
        } else {
          for (let i = 0; i < Object.keys(this.input).length; i++) {
            this.isReadOnly[i] = true;
          }
        }
      }

      // reset and sets new formcontrols
      this.form = this.formBuilder.group({});
      this.form = this.formBuilder.group(formControls);
    });

    // takes parameters from path
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.isEdit = params.get('isEdit') === 'true';
      this.inputType = params.get('inputType')!;
      if (!this.isEdit) {
        this.formService.getInput(this.inputType);
      } else {
        this.id = params.get('id')!;
        this.formService.getEdit(this.inputType, this.id);
      }
    });
  }

  //sets string for date display
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // close popup
  closePopup() {
    //form reset
    this.form.reset;
    //go back to home
    this.router.navigate(['']);
  }

  //no event propagation of popup close
  handleRectangleClick(event: Event) {
    event.stopPropagation();
  }

  //formgroup to db
  onSubmit() {
    // if it is edit or not makes put or post
    if (this.isEdit) {
      this.formService.onEdit(this.form, this.inputType, this.id!);
    } else {
      this.formService.onSubmit(this.form, this.inputType);
    }
    this.closePopup();
  }

  getFieldNames(): string[] {
    // gives a keys array depending on data type
    return Object.keys(this.input);
  }

  //the input can't be edit when the following is clicked
  isOnFocus(k: number) {
    this.isReadOnly[k] = true;
  }

  //if dropdown, set selected option and valid and touched states
  onOptionSelected(option: string, k: number) {
    this.form.get(this.getFieldNames()[k])?.setValue(option);
    this.form.get(this.getFieldNames()[k])?.markAsTouched;
    this.form.get(this.getFieldNames()[k])?.updateValueAndValidity();
  }

  //set readonly when edit button is clicked. All other inputs are disabled
  onEditClick(i: number) {
    for (let j = 0; j < this.isReadOnly.length; j++) {
      this.isReadOnly[j] = true;
    }
    this.isReadOnly[i] = !this.isReadOnly[i];
  }
}
