import { Component, Input } from '@angular/core';
import { Dropdown } from 'src/app/objects/dropdown';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Input() filter: Dropdown = {
    placeholder: 'filtro1',
    options: ['opzione 1', 'opzione 2', 'opzione 4'],
  };
}
