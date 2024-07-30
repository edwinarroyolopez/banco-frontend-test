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
  private data: Product[] = []; // Variable para almacenar productos

  private apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  private dataSubject = new BehaviorSubject<Product[]>([]);
  data$ = this.dataSubject.asObservable();

  loadProducts() {
    console.log('loadProducts');
    this.getProducts().subscribe(response => {
      this.data = response.data; // Almacena los productos en la variable data
      this.dataSubject.next(this.data); // Emite los datos actuales
    });
  }

  addItem(product: Product) {
    this.data.push(product); // Agrega el nuevo producto al arreglo data
    this.dataSubject.next(this.data); // Emite los datos actualizados
  }

  filterData(query: string) {
    console.log('filterData', query);
    const filteredData = this.data.filter(
      (item) =>
        item.name.includes(query) ||
        item.description.includes(query) ||
        item.date_release.includes(query)
    );
    
    this.dataSubject.next(filteredData); // Emite los datos filtrados
  }
}
