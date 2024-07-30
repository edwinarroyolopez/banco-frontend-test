import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
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

  }

  validateIdNotTaken(control: any) {
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
      const newProduct = this.productForm.value;
      this.dataService.addItem(newProduct);
      this.router.navigate(['/']);
    }
  }
}
