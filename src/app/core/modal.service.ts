import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private confirmAction: () => void = () => {};
  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();

  openModal(message: string, confirmAction: () => void): void {
    console.log("open modal")
    this.confirmAction = confirmAction;
    this.messageSubject.next(message);
  }

  confirm(): void {
    this.confirmAction();
    this.closeModal();
  }

  closeModal(): void {
    this.messageSubject.next('');
  }
}
