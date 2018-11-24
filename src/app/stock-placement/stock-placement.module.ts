import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockPlacementComponent } from './stock-placement.component';
import { ProcurarNomePipe } from '../pipes/procurar-nome.pipe';
import { ProcuraTipoPipe } from '../pipes/procura-tipo.pipe';
import { PrcourarMinDatePipe } from '../pipes/prcourar-min-date.pipe';
import { PrcourarMaxDatePipe } from '../pipes/prcourar-max-date.pipe';
import { StockPlacementMaintainComponent } from './stock-placement-maintain/stock-placement-maintain.component';


@NgModule({
  declarations: [
    StockPlacementComponent,
    ProcurarNomePipe,
    ProcuraTipoPipe,
    PrcourarMinDatePipe,
    PrcourarMaxDatePipe,
    StockPlacementMaintainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [

  ],
  exports: [
    StockPlacementComponent
  ]
})
export class StockPlacementModule { }
