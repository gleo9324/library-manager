import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-browse-pages',
  templateUrl: './browse-pages.component.html',
  styleUrls: ['./browse-pages.component.css'],
})
export class BrowsePagesComponent {
  @Input() maxPages!: number;
  @Input() currentPage: number = 0;
  @Output() sendPage = new EventEmitter<number>();
  changePage: number = 0;
  pageArray: boolean[] = [];
  firstPage: number = 0;
  lastPage: number = 3;

  ngOnChanges(changes: SimpleChanges): void {
    //carica il contenuto solo quando maxPages arriva in input
    if (changes['maxPages'] && changes['maxPages'].previousValue == undefined) {
      // popola l'array per definire i riquadri di pagina
      for (let i = 0; i < this.maxPages; i++) {
        this.pageArray[i] = false;
      }
      this.pageArray[0] = true;
    } else if (
      changes['maxPages'] &&
      changes['maxPages'].previousValue !== undefined
    ) {
      // console.log('da browse pages: ', changes['maxPages'].currentValue);
      // se maxPage cambia. si resetta e ridefinisce pageArray e si imposta che la pagina sia l'ultima
      this.pageArray = [];
      // console.log(this.pageArray);
      for (let i = 0; i < changes['maxPages'].currentValue; i++) {
        this.pageArray[i] = false;
      }
      this.pageArray[changes['maxPages'].currentValue - 1] = true;
      // console.log('nuovo pageArray ', this.pageArray);
      this.onPageClick(changes['maxPages'].currentValue);
    }

    if (changes['currentPage']) {
      for (let i = 0; i < this.maxPages; i++) {
        this.pageArray[i] = false;
      }
      this.pageArray[changes['currentPage'].currentValue] = true;
      // quando si selezione il blocco massimo prima dei "..." e non si è alla pagina max, si deve shiftare di uno in avanti il blocco di pagine visualizzate
      if (
        changes['currentPage'].currentValue > this.lastPage - 1 &&
        changes['currentPage'].currentValue < this.maxPages - 1
      ) {
        this.firstPage = this.firstPage + 1;
        this.lastPage = this.lastPage + 1;
      }
      //quando si selezione il blocco minimo prima dei "..." e non si è alla pagina 1, si deve shiftare di uno indietro il blocco di pagine visualizzate
      else if (
        changes['currentPage'].currentValue <= this.firstPage &&
        changes['currentPage'].currentValue != 0
      ) {
        this.firstPage = this.firstPage - 1;
        this.lastPage = this.lastPage - 1;
        //se si è all'ultima pagina, resetta l'intervallo di quadrati visualizzati a 3
        if (this.lastPage - this.firstPage > 3) {
          this.lastPage = this.firstPage + 3;
        }
        //se si arriva alla prima pagina, si resettano i valori iniziali
        if (this.firstPage < 0) {
          this.firstPage = 0;
          this.lastPage = 3;
        }
      }
      //se si va all'ultima pagina, imposta maggiore intervallo di visualizzazione per mantenere le proporzioni di riquadri visualizzati
      else if (changes['currentPage'].currentValue == this.maxPages - 1) {
        this.firstPage = this.maxPages - 6;
        this.lastPage = this.maxPages;
      }
      //reimposta ai valori iniziali se si va a pag. 1
      else if (changes['currentPage'].currentValue == 0) {
        this.firstPage = 0;
        this.lastPage = 3;
      }
      // console.log('current page ' + this.currentPage);
      // console.log('first page ' + this.firstPage);
      // console.log('last page ' + this.lastPage);
      // console.log('page array ' + this.pageArray.length);
      // console.log('max page ' + this.maxPages);
      // console.log('-------------------------------------------------');
    }
  }

  onBackClick() {
    this.changePage = -1;
    this.sendPage.emit(this.changePage);
  }

  onForwardClick() {
    this.changePage = -3;
    this.sendPage.emit(this.changePage);
  }

  onFirstPageClick() {
    this.changePage = -this.maxPages;
    this.sendPage.emit(this.changePage);
  }

  onLastPageClick() {
    this.changePage = this.maxPages;
    this.sendPage.emit(this.changePage);
  }

  onPageClick(i: number) {
    this.changePage = i;
    this.sendPage.emit(this.changePage);
  }
}
