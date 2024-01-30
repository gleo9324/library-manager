import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TableOptions } from 'src/app/objects/table-options';
import { DbService } from '../db-service/db.service';
import { Router } from '@angular/router';
import { BOOK_TABLE } from 'src/app/data-structures/book-table';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  // table settings
  options!: TableOptions;
  // data in table
  data: { [key: string]: any }[] = [];
  // observable to keep data updated
  private dataSubject = new Subject<any[]>();
  dataUpToDate$ = this.dataSubject.asObservable();

  constructor(private dbService: DbService, private router: Router) {}

  // settings depending on data type
  getOptions(tableType: string): TableOptions {
    switch (tableType) {
      case 'book':
        return (this.options = BOOK_TABLE);
      default:
        return {
          title: '',
          headButtons: [],
          dataTypeOne: '',
          dataTypeTwo: '',
          hasLegend: true,
          filters: [],
          tableHead: [],
          tableType: '',
          tableSort: '',
          actionIcons: [],
        };
    }
  }

  // gets data depending on data type
  getData(tableType: string) {
    const data = this.dbService.get(tableType);
    this.data = data;
    // order data depending on tableSort
    this.data.sort((a, b) =>
      a[this.options.tableSort].localeCompare(b[this.options.tableSort])
    );
    // updates data
    this.dataSubject.next(this.data);

    // if db is connected
    // this.dbService.get(tableType).subscribe((data: any) => {
    //   this.data = this.mapper.mapDataArray(tableType, data);
    //   // order data depending on tableSort
    //   this.data.sort((a, b) =>
    //     a[this.options.tableSort].localeCompare(b[this.options.tableSort])
    //   );
    //   // updates data
    //   this.dataSubject.next(this.data);
    // });
  }

  onActionClick(
    // gets icons index (ev[0]) and data row index (ev[1])
    ev: number[],
    tableType: string,
    data: { [key: string]: any }[]
  ) {
    switch (this.options.actionIcons[ev[0]]) {
      case 'edit':
        //opens edit popup and saves id of the data we want to edit
        const editID = this.data[ev[1]]['id'];
        this.router.navigate(['/form', tableType, true, `${editID}`]);
        break;
      case 'bin': //deletes the data field
        this.dbService.delete(tableType, data[ev[1]]['id']);
        this.getData(tableType);
        //if db is connected
        // this.dbService
        //   .delete(tableType, data[ev[1]]['id'])
        //   .subscribe((data) => {
        //     // updates table data
        //     this.getData(tableType);
        //   });
        break;
      case 'printer':
        break;
      case 'ok':
        break;
      case 'send':
        break;
      default:
        console.log('Option invalid');
    }
  }
}
