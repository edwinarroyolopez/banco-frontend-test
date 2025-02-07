export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
  }
  
  export interface ApiResponse {
    data: Product[];
  }
  
  export interface ApiResponseProduct {
    data: Product;
  }