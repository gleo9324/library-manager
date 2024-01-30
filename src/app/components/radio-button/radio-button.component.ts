import { Component, Input } from '@angular/core';
import { RadioButtonOptions } from 'src/app/objects/radio-button-options';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
})
export class RadioButtonComponent {
  // Definisci variabile di stato per tenere traccia dell'opzione selezionata
  selectedOptionIndex: number = -1;

  // Array di opzioni
  @Input() options: RadioButtonOptions[] = [
    { option: 'Option 1', isSelected: false },
    { option: 'Option 2', isSelected: false },
    { option: 'Option 3', isSelected: false },
    { option: 'Option n', isSelected: false },
  ]; // Aggiungi quante n opzioni desiderate

  // Metodo per gestire il clic sull'opzione
  handleOptionClick(index: number) {
    this.selectedOptionIndex = index;

    for (let j = 0; j < this.options.length; j++) {
      this.options[j].isSelected = false;
    }
    this.options[index].isSelected = true;

    // Puoi fare qualcosa in base all'opzione selezionata, ad esempio, stampare il testo dell'opzione selezionata
    //console.log('Opzione selezionata:', this.options[index]);
  }
}
