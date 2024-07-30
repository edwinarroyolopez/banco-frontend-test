import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FeaturesModule } from './features/features.module';
import { FilterComponent } from './shared/filter/filter.component';
import { DataService } from './core/data.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FeaturesModule,
    AppRoutingModule,
    FilterComponent,
    AppComponent
  ],
  exports: [],
  providers: [DataService],
  bootstrap: []
})
export class AppModule { }
