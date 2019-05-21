import { CompareValidatorsDirective } from './shared/directives/compare-validator.directive';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './containers/people/people.component';
import { ProductsComponent } from './containers/products/products.component';
import { CategoriesComponent } from './containers/categories/categories.component';
import { LoginComponent } from './containers/login/login.component';
import { ManageComponent } from './containers/manage/manage.component';
import { EntryComponent } from './containers/entry/entry.component';
import { ClassificationsComponent } from './containers/classifications/classifications.component';
import { HomeComponent } from './containers/home/home.component';
import { StockRemovalComponent } from './containers/stock-removal/stock-removal.component';
import { StockPlacementComponent } from './containers/stock-placement/stock-placement.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

import { ProcurarPessoaPipe } from './shared/pipes/procurar-pessoa.pipe';
import { OrdenarNomePipe } from './shared/pipes/ordenar-por-nome.pipe';

import { StockPlacementModule } from './containers/stock-placement/stock-placement.module';
import { LoaderComponent } from "./shared/loader/loader.component";
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcurarUserPipe } from './shared/pipes/procurar-user.pipe';
import { ProcurarClassificationPipe } from './pipes/procurar-classificacao.pipe';
import { ProcurarCategoriaPipe } from './pipes/procurar-categoria.pipe';
import { ProcurarProductPipe } from './pipes/procura-produto.pipe';
import { ProcurarMovPipe } from './pipes/procurar-mov-type.pipe';
import { ProcurarPessoaNome } from './pipes/procurar-name-financial-people.pipe';
import { Procurardate } from './pipes/procurar-date-financial.pipe';

import { ToastrModule } from 'ngx-toastr';

import { AddPersonComponent } from './containers/people/add-person/add-person.component';
import { AddUserComponent } from './containers/manage/add-user/add-user.component';
import { AddOutputComponent } from './containers/stock-removal/add-output/add-output.component';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MinDatePipe } from './shared/pipes/min-date.pipe';
import { MaxDatePipe } from './shared/pipes/max-date.pipe';

export var options: Partial<IConfig> | (() => Partial<IConfig>);
registerLocaleData(localePt);


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
    ProcurarUserPipe,
    ProcurarProductPipe,
    ProcurarMovPipe,
    Procurardate,
    ProcurarPessoaNome,
    AddPersonComponent,
    AddUserComponent,
    AddOutputComponent,
    MinDatePipe,
    MaxDatePipe
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
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(options)
    
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],


  bootstrap: [AppComponent],
  exports: [ CompareValidatorsDirective ]
})
export class AppModule { }
