import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service'; 

@Component({
  selector: 'app-footer',
  imports: [FormsModule,],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  subscribeEmail = '';

  constructor(private messageService: MessageService) {}

  onSubscribe(): void {
    if (!this.subscribeEmail.trim()) {
      return;
    }

    this.messageService.showSuccess(
      'Вы успешно подписались на рассылку!'
    );

    this.subscribeEmail = '';
  }
}
