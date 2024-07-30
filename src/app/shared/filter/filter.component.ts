import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  template: `
    <input type="text" (input)="onFilter($event)" placeholder="Buscar productos..." class="search-box"/>
  `,
  styleUrls: ['./filter.component.css'],
  imports: [CommonModule]
})
export class FilterComponent {
  
  constructor(private dataService: DataService) {
    console.log('FilterComponent initialized');
  }

  onFilter(event: Event) {
    console.log('Input event triggered');
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('onFilter:', filterValue);
    
    this.dataService.filterData(filterValue);
  }
}