import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FilterComponent } from '../../shared/filter/filter.component';
import { TableComponent } from '../../shared/table/table.component';
import { ModalComponent } from '../../shared/modal/modal.component'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    FilterComponent,
    TableComponent,
    ModalComponent,
    CommonModule
  ]

})
export class HomeComponent {
  isModalOpen = false;

  openModal() {
    console.log('openModal');
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
