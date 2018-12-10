import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { EntryComponent } from './entry/entry.component';
import { ClassificationsComponent } from './classifications/classifications.component';
import { HomeComponent } from './home/home.component';
import { StockRemovalComponent } from './stock-removal/stock-removal.component';
import { StockPlacementComponent } from './stock-placement/stock-placement.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { CategoriesService } from './categories.service';


@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    ProductsComponent,
    CategoriesComponent,
    LoginComponent,
    ManageComponent,
    EntryComponent,
    ClassificationsComponent,
    HomeComponent,
    StockRemovalComponent,
    StockPlacementComponent,
    AddProductsComponent,
    AddCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ CategoriesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
