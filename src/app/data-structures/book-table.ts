import { TableOptions } from '../objects/table-options';

export const BOOK_TABLE: TableOptions = {
  title: 'Libreria',
  headButtons: ['aggiungi'],
  dataTypeOne: '', //to be compiled if different data types are in the table. this could open two different forms
  dataTypeTwo: '',
  hasLegend: false, //if you have different data type in the same table, can set up a legend
  filters: [], //example [{ placeholder: 'author', options: ['option 1', 'option 2'] }],
  tableHead: ['title', 'author', 'year'],
  tableType: 'book.',
  tableSort: 'title',
  actionIcons: ['edit', 'bin'],
};
