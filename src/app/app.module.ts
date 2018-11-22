import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
