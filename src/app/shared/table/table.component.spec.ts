import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableComponent } from './table.component';
import { DataService } from '../../core/data.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ApiResponse } from '../../core/api-response.model';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let dataService: DataService;

  const dummyProductsResponse: ApiResponse = {
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
        TableComponent,
        HttpClientTestingModule
      ],
      providers: [DataService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
  });

  it('should create', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of(dummyProductsResponse));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the correct number of products', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of(dummyProductsResponse));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(dummyProductsResponse.data.length);
    expect(compiled.querySelector('.results-label').textContent).toContain(`${dummyProductsResponse.data.length} Resultados`);
  });

  it('should display the correct initials for product avatar', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of(dummyProductsResponse));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const avatar = compiled.querySelector('.avatar').textContent.trim();
    const expectedInitials = dummyProductsResponse.data[0].name.split(' ').map(n => n[0]).join('');
    expect(avatar).toBe(expectedInitials);
  });

  it('should change the number of items per page', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of(dummyProductsResponse));
    fixture.detectChanges();
    const selectElement = fixture.debugElement.query(By.css('.items-per-page')).nativeElement;
    selectElement.value = '10'; // Change value to 10
    selectElement.dispatchEvent(new Event('change')); 
    fixture.detectChanges();
    expect(component.itemsPerPage).toBe(10);
  });

  it('should update filteredProducts when data is loaded', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of(dummyProductsResponse));
    fixture.detectChanges();
    expect(component.filteredProducts).toEqual(dummyProductsResponse.data);
  });

  it('should unsubscribe from dataService on destroy', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of(dummyProductsResponse));
    spyOn(component['subscription'], 'unsubscribe').and.callThrough();
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should handle empty product list gracefully', () => {
    spyOn(dataService, 'getProducts').and.returnValue(of({ data: [] } as ApiResponse));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tbody tr').length).toBe(0);
    expect(compiled.querySelector('.results-label').textContent).toContain('0 Resultados');
  });

  it('should handle errors from dataService gracefully', () => {
    spyOn(dataService, 'getProducts').and.returnValue(throwError(() => new Error('Error loading products')));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(component.filteredProducts).toEqual([]);
  });
});
