import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PeopleComponent } from './people/people.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { StockPlacementComponent } from './stock-placement/stock-placement.component';
import { StockRemovalComponent } from './stock-removal/stock-removal.component';
import { ClassificationsComponent } from './classifications/classifications.component';
import { EntryComponent } from './entry/entry.component';
import { ManageComponent } from './manage/manage.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StockPlacementMaintainComponent } from './stock-placement/stock-placement-maintain/stock-placement-maintain.component';

const routes: Routes = [
  
  {path: '', component: NavbarComponent, children:[
    
    { path: 'pessoas', component: PeopleComponent },
    { path: 'produtos', component: ProductsComponent },
    { path: 'categorias', component: CategoriesComponent },
    { path: 'entradas', component: StockPlacementComponent},
    { path: 'saidas', component: StockRemovalComponent},
    { path: 'entradas', component: StockPlacementComponent},
    { path: 'entradas/cadastrar', component: StockPlacementMaintainComponent},
    { path: 'entradas/editar/?id', component: StockPlacementMaintainComponent},
    { path: 'classificacoes', component: ClassificationsComponent},
    { path: 'lancamentos', component: EntryComponent},
    { path: 'gerenciar', component: ManageComponent},
    { path: '', component: HomeComponent }
  ] }

  /**{ path: '', redirectTo:'login' ,pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: NavbarComponent, canActivate:[], children:[
    {  path: '', component: HomeComponent },
    { path: 'pessoas', component: PeopleComponent },
    { path: 'produtos', component: ProductsComponent },
    { path: 'categorias', component: CategoriesComponent },
    { path: 'entradas', component: StockPlacementComponent},
    { path: 'saidas', component: StockRemovalComponent},
    { path: 'entradas', component: StockPlacementComponent},
    { path: 'classificacoes', component: ClassificationsComponent},
    { path: 'lancamentos', component: EntryComponent},
    { path: 'gerenciar', component: ManageComponent}
  ] }**/
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
