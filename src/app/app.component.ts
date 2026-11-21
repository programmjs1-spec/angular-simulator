import './training';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { StorageService } from './services/storage.service';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { MessageComponent } from './shared/message/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    MessageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {

  // Искусственная загрузка страницы
  isLoading = true;
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  constructor(private storageService: StorageService) {
    console.log(this.isPrimaryColor(Color.Red));

    this.saveLastVisit();
    this.saveVisitCount();

    const numbers = new Collection<number>([10, 20, 30]);
    console.log(numbers.getAll());

    const names = new Collection<string>(['Иван', 'Петр', 'Анна']);
    console.log(names.getAll());
  }

  ngOnInit(): void {
    // Искусственная загрузка на 1 секунду
    this.loadingTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.loadingTimeout !== undefined) {
      clearTimeout(this.loadingTimeout);
    }
  }

  // Проверка основного цвета
  isPrimaryColor(color: Color): boolean {
    return (
      color === Color.Red ||
      color === Color.Green ||
      color === Color.Blue
    );
  }

  // Сохранение времени последнего посещения
  saveLastVisit(): void {
    this.storageService.setItem<string>(
      'lastVisit',
      new Date().toLocaleString()
    );
  }

  // Счётчик посещений
  saveVisitCount(): void {
    const count = this.storageService.getItem<number>('visitCount') ?? 0;
    this.storageService.setItem<number>('visitCount', count + 1);
  }
}