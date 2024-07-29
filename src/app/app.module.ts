import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { AppRoutingModule } from './app-routing.module';
import { FeaturesModule } from './features/features.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FeaturesModule,
    AppRoutingModule,
  ],
  exports: [],
  providers: [ProductService],
  bootstrap: []
})
export class AppModule { }



// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { CoreModule } from './core/core.module';
// import { SharedModule } from './shared/shared.module';
// import { FeaturesModule } from './features/features.module';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     AppRoutingModule,  // Importa AppRoutingModule aquí
//     CoreModule,
//     SharedModule,
//     FeaturesModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
