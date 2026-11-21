import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit, OnDestroy {

  companyName = 'РУМТИБЕТ';

  activeHeaderFeature: 'timer' | 'counter' = 'timer';

  clickCount = 0;

  currentDate = new Date();

  private timerId?: ReturnType<typeof setInterval>;

  navItems = [
    {
      title: 'Главная',
      link: '/'
    },
    {
      title: 'Пользователи',
      link: '/users'
    }
  ];

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
    }
  }

  get headerFeatureButtonText(): string {
    return this.activeHeaderFeature === 'timer'
      ? 'Показать кликер'
      : 'Показать дату';
  }

  toggleHeaderFeature(): void {
    this.activeHeaderFeature =
      this.activeHeaderFeature === 'timer' ? 'counter' : 'timer';
  }

  increaseCount(): void {
    this.clickCount++;
  }

  decreaseCount(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }
}
