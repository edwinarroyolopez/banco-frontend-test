import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class ModalComponent {
  newProduct = {
    id: '', 
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };

  constructor(private dataService: DataService) {}

  onSubmit() {
    console.log('onSubmit', this.newProduct);
    
    this.dataService.addItem(this.newProduct);
    
    this.newProduct = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    };
  }

  closeModal() {
  }
}
