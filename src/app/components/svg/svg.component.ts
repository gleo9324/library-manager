import { Component } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css'],
})
export class SvgComponent {
  isHover = false;
  isSelected = false;

  onMouseOver(): void {
    this.isHover = true;
    console.log('Mouse over');
  }

  onMouseOut(): void {
    this.isHover = false;
    console.log('Mouse out');
  }

  onClick() {
    this.isSelected = !this.isSelected;
  }
}
