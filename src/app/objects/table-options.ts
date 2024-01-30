import { Dropdown } from './dropdown';

export interface TableOptions {
  title: string;
  headButtons: string[];
  hasLegend: boolean;
  dataTypeOne?: string;
  dataTypeTwo?: string;
  filters: Dropdown[];
  tableHead: string[]; //intestazione tabella, corrispondono alle key del db ma solo quelle che si vogliono visualizzare
  tableType: string; //tipologia tabella
  tableSort: string; //rispetto a quale elemento di head va settato la disposizione iniziale dei dati nella tabella (default: data)
  actionIcons: string[]; //action icons richieste nella tabella
}
