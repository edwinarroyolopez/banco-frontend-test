import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from '../../shared/filter/filter.component';
import { TableComponent } from '../../shared/table/table.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { DataService } from '../../core/data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientModule,
        FilterComponent,
        TableComponent,
        ModalComponent
      ],
      declarations: [],
      providers: [DataService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button to add product', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button[routerLink="/add-product"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Agregar');
  });

  it('should contain app-filter, app-table, and app-modal components', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-filter')).toBeTruthy();
    expect(compiled.querySelector('app-table')).toBeTruthy();
    expect(compiled.querySelector('app-modal')).toBeTruthy();
  });
});
