import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TableOptions } from 'src/app/objects/table-options';
import { TableService } from 'src/app/services/table-service/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  // set data type
  @Input() tableType?: string;
  // container is open or closed
  isOpen: boolean = true;
  // shows which column the table is ordered
  isOrdered: boolean[] = [];
  // variables to navigate table pages
  pageIndex: number = 0;
  page: number = 0;
  maxPages?: number;

  // variables for table settings
  table!: TableOptions;
  // table data
  data: { [key: string]: any }[] = [];

  constructor(private tableService: TableService, private router: Router) {}

  ngOnInit(): void {
    // keeps data updated thanks to dataUpToDate from tableService
    this.tableService.dataUpToDate$.subscribe((data) => {
      this.data = data;
      // if data update, updates also page numbers
      this.maxPages = Math.ceil(this.data.length / 4);
    });
    this.tableService.getData(this.tableType!);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableType'] && this.tableType !== undefined) {
      // if data type changes, table settings and data get updated
      this.table = this.tableService.getOptions(
        changes['tableType'].currentValue
      );

      // update data
      this.tableService.getData(changes['tableType'].currentValue);
      //set icon orientation of column depending on which data are ordered
      let j: number = 0;
      for (let i = 1; i < this.table.tableHead.length; i++) {
        this.isOrdered[i] = false;
        if (this.table.tableHead[i] == this.table.tableSort) {
          j = i;
        }
      }

      this.isOrdered[j] = true;
    }
  }

  // set date in regex to pipe as dd/mm/yy
  isDate(value: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    return dateRegex.test(value);
  }

  //open and close the table container
  onOpenIconClick() {
    this.isOpen = !this.isOpen;
  }

  //orders data depending on table head
  onOrderIconClick(r: number) {
    for (let i = 0; i < this.table.tableHead.length; i++) {
      this.isOrdered[i] = false;
    }
    this.isOrdered[r] = true;

    // makes sort on keys
    this.data.sort((a, b) => {
      if (!isNaN(a[this.table.tableHead[r]] && b[this.table.tableHead[r]])) {
        return a[this.table.tableHead[r]] - b[this.table.tableHead[r]];
      } else {
        return a[this.table.tableHead[r]].localeCompare(
          b[this.table.tableHead[r]]
        );
      }
    });
  }

  // page table control
  onBrowsePages(changePage: number) {
    if (this.maxPages !== undefined) {
      switch (changePage) {
        //following page
        case -3:
          if (this.pageIndex + 4 < this.data.length) {
            this.pageIndex = this.pageIndex + 4;
            this.page = this.page + 1;
          }
          break;
        //previous page
        case -1:
          if (this.pageIndex + changePage * 4 >= 0) {
            this.pageIndex = this.pageIndex + changePage * 4;
            this.page = this.page - 1;
          }
          break;
        //first page
        case -this.maxPages:
          this.pageIndex = 0;
          this.page = 0;
          break;
        //last page
        case this.maxPages:
          this.pageIndex = changePage * 4 - 4;
          this.page = this.maxPages - 1;
          break;
        default:
          this.pageIndex = changePage * 4;
          this.page = changePage;
      }
    }
  }

  onTableHeadButtonClick(j: number) {
    // opens form for data type
    this.router.navigate(['/form', this.tableType, false, '']);
  }

  onActionIconClick(q: number, k: number) {
    // q = clicked icon, k = data row. k + pageIndex input index
    this.tableService.onActionClick(
      [q, k + this.pageIndex],
      this.tableType!,
      this.data
    );
  }
}
