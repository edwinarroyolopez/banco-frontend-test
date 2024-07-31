import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


import { AddProductComponent } from './add-product.component';
import { DataService } from '../../core/data.service';
import { Product } from '../../core/api-response.model';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getProductById', 'isIdTaken', 'addItem', 'updateProduct']);
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        AddProductComponent
      ],
      declarations: [],
      providers: [
        { provide: DataService, useValue: dataServiceSpy }
      ]
    }).compileComponents();

    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    dataService.isIdTaken.and.returnValue(Promise.resolve(false));
    dataService.getProductById.and.returnValue(undefined);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all fields as touched and not submit if the form is invalid', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    const form = component.productForm;
    form.controls['id'].setValue('');
    form.controls['name'].setValue('');
    form.controls['description'].setValue('');
    form.controls['logo'].setValue('');
    form.controls['date_release'].setValue('');
    form.controls['date_revision'].setValue('');

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(form.controls['id'].touched).toBeTruthy();
    expect(form.controls['name'].touched).toBeTruthy();
    expect(form.controls['description'].touched).toBeTruthy();
    expect(form.controls['logo'].touched).toBeTruthy();
    expect(form.controls['date_release'].touched).toBeTruthy();
    expect(form.controls['date_revision'].touched).toBeTruthy();
    expect(form.invalid).toBeTruthy();
  });


  it('should call updateProduct if product exists', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const product: Product = {
      id: '123',
      name: 'Test Product',
      description: 'Test Product Description',
      logo: 'http://example.com/logo.png',
      date_release: '2025-08-30',
      date_revision: '2026-08-30'
    };
    component.product = product;
    component.productForm.setValue(product);
    component.onSubmit();

    expect(dataService.updateProduct).toHaveBeenCalledWith(product);
  });
});
