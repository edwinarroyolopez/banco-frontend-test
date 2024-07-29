import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { TableComponent } from '../shared/table/table.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HomeComponent,
    FilterComponent,
    TableComponent,
    ModalComponent
  ], 
  exports: [
    HomeComponent,
    FilterComponent,
    TableComponent,
    ModalComponent
  ]
})
export class FeaturesModule { }
