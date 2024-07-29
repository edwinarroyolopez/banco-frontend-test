import { Component } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  constructor(private dataService: DataService) {}

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataService.filterData(filterValue);
  }
}
