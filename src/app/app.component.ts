import "./training";

import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName = 'РУМТИБЕТ';

  constructor() {
    console.log(this.isPrimaryColor(Color.Red));
    this.saveLastVisit();
    this.saveVisitCount();

    const numbers = new Collection<number>([10, 20, 30]);

    console.log(numbers.getAll());
    const names = new Collection<string>([
    'Иван',
    'Петр',
    'Анна'
  ]);

  console.log(names.getAll());
  }
  
  isPrimaryColor(color: Color): boolean {
    return (
      color === Color.Red ||
      color === Color.Green ||
      color === Color.Blue 
    );
  }

  saveLastVisit(): void {
    localStorage.setItem (
      'lastVisit',
      new Date().toLocaleString()
    );
  }

  saveVisitCount(): void {
    const count = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem(
      'visitCount',
      String(count + 1)
    );
  }
}
