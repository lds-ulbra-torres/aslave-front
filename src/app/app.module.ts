import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { NavbarComponent } from './navbar/navbar.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { StockPlacementModule } from './stock-placement/stock-placement.module';


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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
     StockPlacementModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
