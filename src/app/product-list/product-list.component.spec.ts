import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product.service';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);

    spyOn(productService, 'getProducts').and.returnValue(of(dummyProducts));
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should display the correct number of products', () => {
    console.log('displaying products')
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(1);
    expect(compiled.querySelector('.results-label').textContent).toContain('1 Resultados');
  });

  // it('should display the correct initials for product avatar', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.avatar').textContent).toBe('NP');
  // });
});
