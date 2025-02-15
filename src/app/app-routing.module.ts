import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AddProductComponent } from './features/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
