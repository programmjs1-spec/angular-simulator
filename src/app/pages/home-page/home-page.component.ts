
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  // Подключаем сервис сообщений
  constructor(private messageService: MessageService) {}

  // Данные формы
  location = '';
  date = '';
  participants = '';

  // Живой инпут
  liveInputValue = '';

  // Проверка формы
  get isFormInvalid(): boolean {
    return !this.location || !this.date || !this.participants;
  }

  // Поиск программы
  findProgram(): void {
    if (this.isFormInvalid) {
      this.messageService.showWarn('Пожалуйста, заполните все поля!');
      return;
    }

    console.log({
      location: this.location,
      date: this.date,
      participants: this.participants
    });

    this.messageService.showSuccess('Программа успешно найдена!');
  }

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
      subtitle: 'для тех, кто заботится о себе',
      price: '230 $',
      rating: '5.0',
      image: '/images/photo/stretching-in-the-mountains.jpg'
    },
  ];

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
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      imageUrl: '/images/photo/India.jpg'
    }
  ];

  galleryPhotos = [
    {
      id: 1,
      image: '/images/photo/galleryPhotos/cappadocia-balloons.jpg',
      alt: 'Воздушные шары в Каппадокии',
      isWide: true,
    },
    {
      id: 2,
      image: '/images/photo/galleryPhotos/travel-flatlay.jpg',
      alt: 'Снаряжение путешественника',
      isWide: false,
    },
    {
      id: 3,
      image: '/images/photo/galleryPhotos/dubai-hotel.jpg',
      alt: 'Отель в Дубае',
      isWide: false,
    },
    {
      id: 4,
      image: '/images/photo/galleryPhotos/beach-boats.jpg',
      alt: 'Лодки у берега',
      isWide: false,
    },
    {
      id: 5,
      image: '/images/photo/galleryPhotos/grand-canyon.jpg',
      alt: 'Каньон Подкова',
      isWide: true,
    },
    {
      id: 6,
      image: '/images/photo/galleryPhotos/notebook-camera.jpg',
      alt: 'Блокнот и камера',
      isWide: false,
    },
  ];

  // Методы для вызова сообщений из HTML

  showSuccess(): void {
    this.messageService.showSuccess('Успешное выполнение операции!');
  }

  showError(): void {
    this.messageService.showError('Произошла ошибка!');
  }

  showWarn(): void {
    this.messageService.showWarn('Внимание! Проверьте данные!');
  }

  showInfo(): void {
    this.messageService.showInfo('Информация о программе тура!');
  }
}
