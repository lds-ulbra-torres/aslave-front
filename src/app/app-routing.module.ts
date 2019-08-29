import { EditEntryComponent } from './containers/entry/edit-entry/edit-entry.component';
import { AddEntryComponent } from './containers/entry/add-entry/add-entry.component';
import { AddClassificationComponent } from './containers/classifications/add-classification/add-classification.component';
import { AddUserComponent } from './containers/manage/add-user/add-user.component';
import { AddOutputComponent } from './containers/stock-removal/add-output/add-output.component';
import { AddPersonComponent } from './containers/people/add-person/add-person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { PeopleComponent } from './containers/people/people.component';
import { ProductsComponent } from './containers/products/products.component';
import { CategoriesComponent } from './containers/categories/categories.component';
import { StockPlacementComponent } from './containers/stock-placement/stock-placement.component';
import { StockRemovalComponent } from './containers/stock-removal/stock-removal.component';
import { ClassificationsComponent } from './containers/classifications/classifications.component';
import { EntryComponent } from './containers/entry/entry.component';
import { ManageComponent } from './containers/manage/manage.component';
import { LoginComponent } from './containers/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './containers/login/auth.guard';
import { StockPlacementMaintainComponent } from './containers/stock-placement/stock-placement-maintain/stock-placement-maintain.component';
import { AddCategorieComponent } from './containers/categories/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './containers/categories/edit-categorie/edit-categorie.component';
import { EditClassificationComponent } from './containers/classifications/edit-classification/edit-classification.component';


const routes: Routes = [

  { path: '', redirectTo:'login' ,pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'pessoas', component: PeopleComponent, canActivate:[AuthGuard] },
  { path: 'pessoas/cadastrar', component:AddPersonComponent, canActivate:[AuthGuard]},
  { path: 'produtos', component: ProductsComponent, canActivate:[AuthGuard] },
  { path: 'categorias', component: CategoriesComponent, canActivate:[AuthGuard] },
  { path: 'categorias/cadastrar', component: AddCategorieComponent, canActivate:[AuthGuard] },
  { path: 'categorias/editar/:id', component: EditCategorieComponent, canActivate:[AuthGuard] },
  { path: 'entradas', component: StockPlacementComponent, canActivate:[AuthGuard]},
  { path: 'entradas/cadastrar', component: StockPlacementMaintainComponent, canActivate:[AuthGuard]},
  { path: 'entradas/editar/?id', component: StockPlacementMaintainComponent, canActivate:[AuthGuard]},
  { path: 'saidas', component: StockRemovalComponent, canActivate:[AuthGuard]},
  { path: 'saidas/cadastrar', component: AddOutputComponent, canActivate:[AuthGuard]},
  { path: 'classificacoes', component: ClassificationsComponent, canActivate:[AuthGuard]},
  { path: 'classificacoes/cadastrar', component: AddClassificationComponent, canActivate:[AuthGuard]},
  { path: 'classificacoes/editar/:id', component: EditClassificationComponent, canActivate:[AuthGuard]},
  { path: 'lancamentos', component: EntryComponent, canActivate:[AuthGuard]},
  { path: 'lancamentos/cadastrar', component: AddEntryComponent, canActivate:[AuthGuard]},
  { path: 'lancamentos/editar/:id', component: EditEntryComponent, canActivate:[AuthGuard]},
  { path: 'gerenciar', component: ManageComponent, canActivate:[AuthGuard]},
  { path: 'gerenciar/cadastrar', component: AddUserComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
