import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

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
});
