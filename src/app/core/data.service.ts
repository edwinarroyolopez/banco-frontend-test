import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DataItem {
  datoA: string;
  datoB: string;
  datoC: string;
}

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
  private data: DataItem[] = [
    { datoA: 'Item1A', datoB: 'Item1B', datoC: 'Item1C' },
    { datoA: 'Item2A', datoB: 'Item2B', datoC: 'Item2C' },
    { datoA: 'Item3A', datoB: 'Item3B', datoC: 'Item3C' },
  ];


  private apiUrl = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
  

  private dataSubject = new BehaviorSubject<DataItem[]>(this.data);
  data$ = this.dataSubject.asObservable();

  addItem(item: DataItem) {
    this.data.push(item);
    this.dataSubject.next(this.data);
  }

  filterData(query: string) {

    console.log(query);
    const filteredData = this.data.filter(
      (item) =>
        item.datoA.includes(query) ||
        item.datoB.includes(query) ||
        item.datoC.includes(query)
    );
    this.dataSubject.next(filteredData);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   logo: string;
//   date_release: string;
//   date_revision: string;
// }

// interface ApiResponse {
//   data: Product[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   private apiUrl = 'http://localhost:3002/bp/products';

//   constructor(private http: HttpClient) { }

//   getProducts(): Observable<ApiResponse> {
//     return this.http.get<ApiResponse>(this.apiUrl);
//   }
// }
