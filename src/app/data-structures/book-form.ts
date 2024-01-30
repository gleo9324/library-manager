import { Validators } from '@angular/forms';
import { InputSettings } from '../objects/input-settings';

export const BOOK_FORM_STRUCTURE: InputSettings = {
  title: {
    type: 'text', //defines the input type
    label: 'Titolo',
    dimension: 50, //50 if the input takes 50% width. 100 if it takes 100% width
    initialContent: '',
    validators: [Validators.required],
  },
  author: {
    type: 'text',
    label: 'Autore',
    dimension: 50,
    initialContent: '',
    validators: [Validators.required],
  },
  year: {
    type: 'text',
    label: 'Anno',
    dimension: 100,
    initialContent: '',
    validators: [Validators.required],
  },
};
