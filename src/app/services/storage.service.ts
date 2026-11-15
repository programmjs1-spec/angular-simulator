import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Установка значения любого типа в хранилище
  public setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Ошибка при сохранении ключа "${key}" в localStorage:`, error);
    }
  }

  // Получение значения с приведением к нужному типу T (возвращает null, если ключа нет)
  public getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Ошибка при чтении ключа "${key}" из localStorage:`, error);
      return null;
    }
  }

  // Очистка определенного элемента хранилища по ключу
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Очистка всего хранилища
  public clear(): void {
    localStorage.clear();
  }
}