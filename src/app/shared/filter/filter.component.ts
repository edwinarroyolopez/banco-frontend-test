import { Component } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  constructor(private dataService: DataService) {}

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('onFilter:', filterValue);
    this.dataService.filterData(filterValue);
  }
}
