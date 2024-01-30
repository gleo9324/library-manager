import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-icon',
  templateUrl: './action-icon.component.html',
  styleUrls: ['./action-icon.component.css'],
})
export class ActionIconComponent {
  // variables to track selected options
  @Input() iconFill: string = ''; // default color (svg)
  @Input() iconName: string = ''; // icon name Input
  @Output() clickEvent = new EventEmitter<boolean>();
  isHover: boolean = false;
  iconColor!: string;
  classiDinamiche = {
    edit: false, // add this class if true, don't add it if false
    printer: false,
    bin: false,
    send: false,
    ok: false,
  };

  ngOnInit(): void {
    this.classiDinamiche = {
      edit: this.iconName == 'edit',
      printer: this.iconName == 'printer',
      bin: this.iconName == 'bin',
      send: this.iconName == 'send',
      ok: this.iconName == 'ok',
    };
  }

  IconClick() {
    this.clickEvent.emit();
  }

  IconHover() {
    this.isHover = !this.isHover;
  }
}
