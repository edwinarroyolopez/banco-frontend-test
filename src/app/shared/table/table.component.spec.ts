

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableComponent } from './table.component';
import { DataService } from '../../core/data.service';
import { of } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let dataService: DataService;

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

    spyOn(dataService, 'getProducts').and.returnValue(of(dummyProducts));
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
