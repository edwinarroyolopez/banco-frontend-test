import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

interface ApiResponse {
  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: Product[] = [];
  private itemsPerPage = 5;
  private currentPage = 1;

  private apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  private dataSubject = new BehaviorSubject<Product[]>([]);
  data$ = this.dataSubject.asObservable();

  loadProducts() {
    this.getProducts().subscribe(response => {
      this.data = response.data;
      this.updatePaginatedProducts();
    });
  }

  addItem(product: Product) {
    this.data.push(product); 
    this.dataSubject.next(this.data); 
  }

  setItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.updatePaginatedProducts();
  }
  
  private updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedData = this.data.slice(startIndex, endIndex);
    this.dataSubject.next(paginatedData);
  }

  filterData(query: string) {
    const filteredData = this.data.filter(
      (item) =>
        item.name.includes(query) ||
        item.description.includes(query) ||
        item.date_release.includes(query)
    );
    this.dataSubject.next(filteredData.slice(0, this.itemsPerPage));
  }
}