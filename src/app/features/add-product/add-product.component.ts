import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataService } from '../../core/data.service';
import { Product } from '../../core/api-response.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product | undefined | null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], this.validateIdNotTaken.bind(this)],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.validateReleaseDate.bind(this)]],
      date_revision: ['', Validators.required]
    });

    const dateReleaseControl = this.productForm.get('date_release');
    const dateRevisionControl = this.productForm.get('date_revision');

    if (dateReleaseControl && dateRevisionControl) {
      dateReleaseControl.valueChanges.subscribe(value => {
        if (value) {
          const releaseDate = new Date(value);
          releaseDate.setFullYear(releaseDate.getFullYear() + 1);
          dateRevisionControl.setValue(releaseDate.toISOString().substring(0, 10));
        }
      });
    }

    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.product = this.dataService.getProductById(productId);
        if (this.product) {
          this.productForm.patchValue(this.product);
        }
      }
    });
  }

  validateIdNotTaken(control: any) {
    if (this.product && this.product.id === control.value) {
      return of(null);
    }
    return this.dataService.isIdTaken(control.value).then(isTaken => {
      return isTaken ? { idTaken: true } : null;
    });
  }

  validateReleaseDate(control: any) {
    const releaseDate = new Date(control.value);
    const today = new Date();
    return releaseDate >= today ? null : { invalidReleaseDate: true };
  }

  onSubmit(): void {
    this.productForm.markAllAsTouched();

    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.product) {
        this.dataService.updateProduct(product);
      } else {
        this.dataService.addItem(product);
      }
      this.router.navigate(['/']);
    }
  }
}
