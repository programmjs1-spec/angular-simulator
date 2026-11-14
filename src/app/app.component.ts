
import './training';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Color } from '../enums/Color';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  companyName = 'РУМТИБЕТ';

  // Искусственная загрузка страницы
  isLoading = true;
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  // Переключение таймера и счётчика
  activeHeaderFeature: 'timer' | 'counter' = 'timer';

  // Счётчик нажатий
  clickCount = 0;

  // Таймер
  currentDate = new Date();
  private timerId?: ReturnType<typeof setInterval>;

  // Данные формы
  location = '';
  date = '';
  participants = '';

  // Live-input
  liveInputValue = '';

  // Программы тура
  programs = [
    {
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: '/images/icon/people.svg',
    },
    {
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: '/images/icon/safety.svg',
    },
    {
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: '/images/icon/valuation.svg',
    },
  ];

  constructor() {
    console.log(this.isPrimaryColor(Color.Red));

    this.saveLastVisit();
    this.saveVisitCount();

    const numbers = new Collection<number>([10, 20, 30]);
    console.log(numbers.getAll());

    const names = new Collection<string>(['Иван', 'Петр', 'Анна']);
    console.log(names.getAll());
  }

  ngOnInit(): void {
    // Таймер текущей даты
    this.timerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  
    // Искусственная загрузка на 2 секунды
    this.loadingTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  
  ngOnDestroy(): void {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
    }
  
    if (this.loadingTimeout !== undefined) {
      clearTimeout(this.loadingTimeout);
    }
  }

  // Текст кнопки переключения
  get headerFeatureButtonText(): string {
    return this.activeHeaderFeature === 'timer'
      ? 'Показать кликер'
      : 'Показать дату';
  }

  // Переключение таймера и счётчика
  toggleHeaderFeature(): void {
    this.activeHeaderFeature =
      this.activeHeaderFeature === 'timer' ? 'counter' : 'timer';
  }

  // Увеличение счётчика
  increaseCount(): void {
    this.clickCount++;
  }

  // Уменьшение счётчика без отрицательных значений
  decreaseCount(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }

  // Проверка формы
  get isFormInvalid(): boolean {
    return !this.location || !this.date || !this.participants;
  }

  // Поиск программы
  findProgram(): void {
    if (this.isFormInvalid) {
      return;
    }

    console.log({
      location: this.location,
      date: this.date,
      participants: this.participants,
    });
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
    localStorage.setItem('lastVisit', new Date().toLocaleString());
  }

  // Счётчик посещений
  saveVisitCount(): void {
    const count = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', String(count + 1));
  }
}
