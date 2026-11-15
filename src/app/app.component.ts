
import './training';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { MessageService, Message, MessageType } from './services/message.service';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  
  protected readonly MessageType = MessageType;

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

  popularDestinations = [
    {
      id: 1,
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: '480 $',
      rating: '4.9',
      image: '/images/photo/boat.jpg'
    },
    {
      id: 2,
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: '500 $',
      rating: '4.5',
      image: '/images/photo/night-in-the-mountains.jpg'
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто забоится о себе',
      price: '230 $',
      rating: '5.0',
      image: '/images/photo/stretching-in-the-mountains.jpg'
    },
  ]

  posts = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор\nразвития предполагает независимые\nспособы реализации соответствующих\nусловий активизации.',
      date: '01/04/2023',
      imageUrl: '/images/photo/Italy.jpg'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор\nразвития предполагает независимые\nспособы реализации соответствующих\nусловий активизации ... независимые\nспособы реализации соответствующих...',
      date: '01/04/2023',
      imageUrl: '/images/photo/airplane.jpg'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор\nразвития предполагает.',
      date: '01/04/2023',
      imageUrl: '/images/photo/narrow-street.jpg'
    },
    {
      id: 4 ,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      imageUrl: '/images/photo/India.jpg'
    } 
  ];

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
  
    // Искусственная загрузка на 2 секунды
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

  public get messageList(): Message[] {
    return this.messageService.messages;
  }

  public triggerToast(type: MessageType): void {
    this.messageService.triggerToast(type);
  }

  public onCloseMessage(id: string): void {
    this.messageService.closeMessage(id);
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
    this.storageService.setItem<string>('lastVisit', new Date().toLocaleString());
  }

  // Счётчик посещений
  saveVisitCount(): void {
    const count = this.storageService.getItem<number>('visitCount') ?? 0;
    this.storageService.setItem<number>('visitCount', count + 1);
  }
}