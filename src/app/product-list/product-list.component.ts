import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { SearchComponent } from '../search/search.component';

interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent
  ],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.filteredProducts = response.data;
    });
  }

  getInitials(name: string): string {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  }

  onSearchTermChanged(searchTerm: string) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
}
