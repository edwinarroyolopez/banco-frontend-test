import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Product } from './api-response.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve products from the API via GET', () => {
    const dummyProducts = {
      data: [
        {
          id: 'uno',
          name: 'Nombre producto',
          description: 'Descripción producto',
          logo: 'assets-1.png',
          date_release: '2025-01-01',
          date_revision: '2025-01-01'
        }
      ]
    };

    service.getProducts().subscribe(products => {
      expect(products.data.length).toBe(1);
      expect(products).toEqual(dummyProducts);
    });
    const apiUrl = 'http://localhost:3002/bp/products';

    const request = httpMock.expectOne(`${apiUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProducts);
  });

  it('should add a product and update the paginated products', () => {
    const newProduct: Product = {
      id: 'dos',
      name: 'Nuevo producto',
      description: 'Descripción del nuevo producto',
      logo: 'assets-2.png',
      date_release: '2025-02-01',
      date_revision: '2025-02-01'
    };

    service.addItem(newProduct);
    service.data$.subscribe(data => {
      expect(data[0]).toEqual(newProduct);
    });
  });

  it('should check if an ID is taken', async () => {
    const existingProduct: Product = {
      id: 'uno',
      name: 'Producto existente',
      description: 'Descripción existente',
      logo: 'assets-1.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01'
    };

    service.addItem(existingProduct);
    const isTaken = await service.isIdTaken('uno');
    expect(isTaken).toBeTrue();
    const isNotTaken = await service.isIdTaken('dos');
    expect(isNotTaken).toBeFalse();
  });

  it('should get a product by its ID', () => {
    const product: Product = {
      id: 'tres',
      name: 'Producto para buscar',
      description: 'Descripción del producto para buscar',
      logo: 'assets-3.png',
      date_release: '2025-03-01',
      date_revision: '2025-03-01'
    };

    service.addItem(product);
    const foundProduct = service.getProductById('tres');
    expect(foundProduct).toEqual(product);
  });

  it('should update a product and reflect the change in data', () => {
    const product: Product = {
      id: 'cuatro',
      name: 'Producto para actualizar',
      description: 'Descripción original',
      logo: 'assets-4.png',
      date_release: '2025-04-01',
      date_revision: '2025-04-01'
    };

    service.addItem(product);

    const updatedProduct: Product = {
      ...product,
      description: 'Descripción actualizada'
    };

    service.updateProduct(updatedProduct);
    service.data$.subscribe(data => {
      expect(data.find(p => p.id === 'cuatro')?.description).toBe('Descripción actualizada');
    });
  });


  it('should filter products based on the query', () => {
    const product1: Product = {
      id: 'siete',
      name: 'Producto filtrado',
      description: 'Descripción filtrada',
      logo: 'assets-7.png',
      date_release: '2025-07-01',
      date_revision: '2025-07-01'
    };

    const product2: Product = {
      id: 'ocho',
      name: 'Otro producto',
      description: 'Otra descripción',
      logo: 'assets-8.png',
      date_release: '2025-08-01',
      date_revision: '2025-08-01'
    };

    service.addItem(product1);
    service.addItem(product2);
    service.filterData('filtrado');

    service.data$.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0]).toEqual(product1);
    });
  });

  it('should remove a product and update the data', () => {
    const product: Product = {
      id: 'nueve',
      name: 'Producto a eliminar',
      description: 'Descripción a eliminar',
      logo: 'assets-9.png',
      date_release: '2025-09-01',
      date_revision: '2025-09-01'
    };

    service.addItem(product);
    service.removeProduct('nueve');

    service.data$.subscribe(data => {
      expect(data.find(p => p.id === 'nueve')).toBeUndefined();
    });
  });
});
