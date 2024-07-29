import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SearchComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [SearchComponent],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
