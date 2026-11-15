import { Injectable } from '@angular/core';

// 1. Создаем enum с перечислением типов месседжа
export enum MessageType {
  SUCCESS = 'Success',
  INFO = 'Info',
  WARN = 'Warn',
  ERROR = 'Error'
}

// 2. Создаем interface для message
export interface Message {
  id: string;
  text: string;
  type: MessageType;
}

@Injectable({
  providedIn: 'root' // Сервис доступен во всем приложении
})
export class MessageService {
  // Инкапсуляция: приватный массив объектов (сообщений)
  private _messages: Message[] = [];

  // Публичный геттер для безопасного чтения массива из компонентов
  public get messages(): Message[] {
    return this._messages;
  }

  // Метод addMessage: добавляет новое сообщение
  public addMessage(text: string, type: MessageType): void {
    const newMessage: Message = {
      id: crypto.randomUUID(), // Автоматическая генерация уникального ID
      text,
      type
    };

    // При добавлении нового сообщения оно отображается первым в списке (вверху)
    this._messages = [newMessage, ...this._messages];

    // Сообщение скрывается автоматически через 5 секунд (5000 мс)
    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

  // Метод для удобного вызова из шаблона по типу
  public triggerToast(type: MessageType): void {
    let text = 'Операция прошла успешно';
    if (type === MessageType.INFO) text = 'Полезная информация для вас';
    if (type === MessageType.WARN) text = 'Внимание! Проверьте данные';
    if (type === MessageType.ERROR) text = 'Произошла ошибка при загрузке';

    this.addMessage(text, type);
  }

  // Метод closeMessage: удаляет сообщение при клике на крестик
  public closeMessage(id: string): void {
    this._messages = this._messages.filter(msg => msg.id !== id);
  }
}