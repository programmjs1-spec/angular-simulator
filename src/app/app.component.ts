
import './training';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { MessageService } from './services/message.service';
import { StorageService } from './services/storage.service';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { MessageComponent } from './shared/message/message.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [DatePipe, CommonModule, HeaderComponent,
  RouterOutlet, FooterComponent, MessageComponent 
  ],
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

  // Email для подписки на рассылку
  subscribeEmail = '';

  constructor(
    private messageService: MessageService,
    private storageService: StorageService
  ) {
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
  
    // Искусственная загрузка на 1 секунды
    this.loadingTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 1000);
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

  // Подписка на рассылку в футере
  onSubscribe(): void {
    if (!this.subscribeEmail.trim()) {
      return;
    }

    console.log('Подписка оформлена на:', this.subscribeEmail);
    this.messageService.showSuccess('Подписка оформлена!');
    this.subscribeEmail = ''; // Очищаем инпут после отправки
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
    this.storageService.setItem<string>('lastVisit', new Date().toLocaleString());
  }

  // Счётчик посещений
  saveVisitCount(): void {
    const count = this.storageService.getItem<number>('visitCount') ?? 0;
    this.storageService.setItem<number>('visitCount', count + 1);
  }
}