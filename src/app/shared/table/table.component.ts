import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/data.service';

interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class TableComponent implements OnInit {
  data: Product[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getProducts().subscribe(response => {
      this.products = response.data;
      this.filteredProducts = response.data;
      this.data = response.data;
    });
  }


  getInitials(name: string): string {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  }

  // onSearchTermChanged(searchTerm: string) {
  //   this.filteredProducts = this.products.filter(product =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

}