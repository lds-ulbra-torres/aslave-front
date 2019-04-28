import { CompareValidatorsDirective } from './directives/compare-validator.directive';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ReactiveFormsModule } from '@angular/forms';
import { ProcurarPessoaPipe } from './pipes/procurar-pessoa.pipe';
import { ProcurarClassificationPipe } from './pipes/procurar-classificacao.pipe';
import { ProcurarCategoriaPipe } from './pipes/procurar-categoria.pipe';
import { OrdenarNomePipe } from './pipes/ordenar-por-nome.pipe';

import { StockPlacementModule } from './stock-placement/stock-placement.module';
import { LoaderComponent } from "./shared/loader/loader.component";
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcurarUserPipe } from './pipes/procurar-user.pipe';




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
    NavbarComponent,
    ProcurarPessoaPipe,
    ProcurarClassificationPipe,
    ProcurarCategoriaPipe,
    LoaderComponent,
    OrdenarNomePipe,
    CompareValidatorsDirective,
    ProcurarUserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StockPlacementModule,
    StockPlacementModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],


  bootstrap: [AppComponent],
  exports: [ CompareValidatorsDirective ]
})
export class AppModule { }
