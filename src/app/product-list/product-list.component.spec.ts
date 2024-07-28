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
        name: 'Nombre Producto',
        description: 'Descripción producto',
        logo: 'assets-1.png',
        date_release: '2025-01-01',
        date_revision: '2025-01-01'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        HttpClientTestingModule
      ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of products', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(dummyProducts.data.length);
    expect(compiled.querySelector('.results-label').textContent).toContain(`${dummyProducts.data.length} Resultados`);
  });

  it('should display the correct initials for product avatar', () => {
    const compiled = fixture.nativeElement;
    const avatar = compiled.querySelector('.avatar').textContent.trim();
    const expectedInitials = dummyProducts.data[0].name.split(' ').map(n => n[0]).join('');
    expect(avatar).toBe(expectedInitials);
  });
});
