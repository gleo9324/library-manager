import { Book } from './../../objects/book';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient) {}

  dbTestUrl: string = 'url';
  library: Book[] = [
    { id: '0', title: 'Oliver Twist', author: 'Charles Dickens', year: '1839' },
    {
      id: '1',
      title: 'Great Expectations',
      author: 'Charles Dickens',
      year: '1860',
    },
    {
      id: '2',
      title: 'The portrait of Dorian Gray',
      author: 'Oscar Wilde',
      year: '1890',
    },
  ];

  //if db is connected
  // get(table: string) {
  //   return this.http.get(this.dbTestUrl + `/${table}`);
  // }
  //
  // getById(table: string, id: string) {
  //   return this.http.get(this.dbTestUrl + `/${table}` + `/id:${id}`);
  // }
  //
  // insert(table: string, body: {}) {
  //   return this.http.post(this.dbTestUrl + `/${table}`, body);
  // }
  //
  // delete(table: string, id: string) {
  //   return this.http.delete(this.dbTestUrl + `/${table}` + `/id:${id}`);
  // }
  //
  // put(table: string, id: string, body: {}) {
  //   return this.http.put(this.dbTestUrl + `/${table}` + `/id:${id}`, body);
  // }

  get(table: string) {
    return this.library;
  }

  getById(table: string, id: number) {
    return this.library[id];
  }

  insert(table: string, body: Book) {
    body.id = this.library.length.toString();
    console.log(body);
    this.library.push(body);
  }

  delete(table: string, id: number) {
    const indexToDelete = this.library.findIndex(
      (item) => item.id === id.toString()
    );
    this.library.splice(indexToDelete, 1);
  }

  put(table: string, id: number, body: Book) {
    console.log('sono in put');
    this.library[id] = body;
  }
}
