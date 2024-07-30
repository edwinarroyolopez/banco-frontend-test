import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../core/modal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
    standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ModalComponent {
  message: string = '';

  constructor(private modalService: ModalService) {
    this.modalService.message$.subscribe(message => {
      this.message = message;
    });
  }

  confirm(): void {
    this.modalService.confirm();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}