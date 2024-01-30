import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TableService } from '../table-service/table.service';
import { InputSettings } from 'src/app/objects/input-settings';
import { Subject } from 'rxjs';
import { DbService } from '../db-service/db.service';
import { BOOK_FORM_STRUCTURE } from 'src/app/data-structures/book-form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  // form settings
  input: InputSettings = {};
  // observable to update form settings
  private inputSubject = new Subject<InputSettings>();
  inputUpToDate$ = this.inputSubject.asObservable();

  constructor(
    private dbService: DbService,
    private tableService: TableService
  ) {}

  // settings definition for data type from const in data-structure
  getInput(formType: string) {
    switch (formType) {
      case 'book':
        this.input = BOOK_FORM_STRUCTURE;
        this.inputSubject.next(this.input);
        break;
      default:
        console.log('type not found');
        break;
    }
  }

  getEdit(formType: string, id: string) {
    // initialize the input depending on data type
    this.getInput(formType);
    // gets initial data from formControl with a getById

    const data = this.dbService.getById(formType, +id);
    // gets initial content from db
    for (const key in data) {
      if (key != 'id') {
        this.input[key].initialContent = data[key];
      }
    }
    // updates input observable
    this.inputSubject.next(this.input);

    //if db is connected
    // this.dbService.getById(formType, id).subscribe((data: any) => {
    //   // gets initial content from db
    //   for (const chiave in data[0]) {
    //     if (chiave != 'id') {
    //       this.input[chiave].initialContent = data[0][chiave];
    //     }
    //   }
    //   // updates input observable
    //   this.inputSubject.next(this.input);
    // });
  }

  onSubmit(form: FormGroup, formType: string) {
    // defines a generic obj in values with keys from input
    const values: any = {};
    for (const key in this.input) {
      if (this.input.hasOwnProperty(key)) {
        values[key] = form.value[key];
        // if key is date, parse into Date
        if (key == 'date') {
          values[key] = new Date(values[key]);
        }
      }
    }

    // post to db
    this.dbService.insert(formType, values);
    // update table values
    this.tableService.getData(formType);

    // if db is connected
    // // post to db
    // this.dbService.insert(formType, values).subscribe(
    //   (data) => {
    //     // update table values
    //     this.tableService.getData(formType);
    //   },
    //   (error) => {
    //     console.error('Error in POST request', error);
    //   }
    // );
  }

  onEdit(form: FormGroup, formType: string, id: string) {
    // defines a generic obj in values with keys from input
    const values: any = {};
    for (const key in this.input) {
      if (this.input.hasOwnProperty(key)) {
        values[key] = form.value[key];
        // if key is date, parse into Date
        if (key == 'date') {
          values[key] = new Date(values[key]);
        }
      }
    }

    // put to db
    this.dbService.put(formType, +id, values);
    // update table values
    this.tableService.getData(formType);

    // if db is connected
    // // fa un put al db
    // this.dbService.put(formType, id, values).subscribe(
    //   (data) => {
    //     // update table values
    //     this.tableService.getData(formType);
    //   },
    //   (error) => {
    //     console.error('Error in PUT request', error);
    //   }
    // );
  }
}
