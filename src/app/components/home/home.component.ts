import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title: string = 'Libreria';
  icon: string = '../../assets/icons/register-icon.svg';
  tablesType: string[] = ['book'];

  constructor() {}
}
