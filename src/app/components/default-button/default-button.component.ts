import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
})
export class DefaultButtonComponent {
  @Input() buttonText: string = 'DEFAULT'; // Inizializza con il testo "DEFAULT"
  @Input() isEmpty: boolean = false; // Definisce lo stile bottone senza sfondo
  @Input() isLight: boolean = true; // Definisce il colore light o dark
  @Input() isGrey: boolean = false; // Definisce il colore grigio
  @Output() clickEvent = new EventEmitter<boolean>();

  //Metodo per gestire il click dell'icona
  ButtonClick() {
    this.clickEvent.emit();
  }
}
