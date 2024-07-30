import { Component } from '@angular/core';
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
  
  constructor(private dataService: DataService) {}

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataService.filterData(filterValue);
  }
}