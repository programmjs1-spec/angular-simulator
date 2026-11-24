
import { Injectable } from '@angular/core';

// Типы сообщений
export enum MessageType {
  SUCCESS = 'Success',
  INFO = 'Info',
  WARN = 'Warn',
  ERROR = 'Error'
}

// Интерфейс сообщения
export interface Message {
  id: string;
  text: string;
  type: MessageType;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _messages: Message[] = [];

  public get messages(): Message[] {
    return this._messages;
  }

  // Приватный метод добавления сообщения
  private addMessage(text: string, type: MessageType): void {

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      type
    };

    this._messages = [newMessage, ...this._messages];

    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

  // Успешное сообщение
  public showSuccess(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }

  // Сообщение с информацией
  public showInfo(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  // Предупреждение
  public showWarn(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  // Сообщение об ошибке
  public showError(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }

  // Закрытие сообщения
  public closeMessage(id: string): void {
    this._messages = this._messages.filter(
      msg => msg.id !== id
    );
  }
}
