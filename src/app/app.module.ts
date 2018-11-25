import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { LoginService } from './login/login.service';

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
    StockPlacementModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
