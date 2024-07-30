import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../core/data.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../core/modal.service';

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
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TableComponent implements OnInit, OnDestroy {
  filteredProducts: Product[] = [];
  itemsPerPage: number = 5;
  private subscription: Subscription = new Subscription();

  constructor(private dataService: DataService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.dataService.loadProducts();

    this.subscription.add(
      this.dataService.data$.subscribe(products => {
        this.filteredProducts = products;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getInitials(name: string): string {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  }

  updatePaginatedProducts(): void {
    this.dataService.setItemsPerPage(this.itemsPerPage);
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(selectElement.value);
    this.updatePaginatedProducts();
  }

  confirmDeleteProduct(product: Product): void {
    this.modalService.openModal(`¿Está seguro de eliminar el producto ${product.name}?`, () => {
      this.deleteProduct(product.id);
    });
  }
  
  deleteProduct(productId: string): void {
    this.dataService.removeProduct(productId);
  }
  
}
