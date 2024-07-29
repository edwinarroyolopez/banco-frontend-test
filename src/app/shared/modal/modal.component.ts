import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class ModalComponent {
  newItem = { datoA: '', datoB: '', datoC: '' };

  constructor(private dataService: DataService) {}

  onSubmit() {
    this.dataService.addItem(this.newItem);
    this.newItem = { datoA: '', datoB: '', datoC: '' };
  }
}