import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatTooltipModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

import { StockPlacementComponent } from './stock-placement.component';
import { ProcurarNomePipe } from '../../shared/pipes/procurar-nome.pipe';
import { ProcuraTipoPipe } from '../../shared/pipes/procura-tipo.pipe';
import { PrcourarMinDatePipe } from '../../shared/pipes/prcourar-min-date.pipe';
import { PrcourarMaxDatePipe } from '../../shared/pipes/prcourar-max-date.pipe';
import { StockPlacementMaintainComponent } from './stock-placement-maintain/stock-placement-maintain.component';

import { StockPlacementService } from './stock-placement.service';

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
    RouterModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    BrowserAnimationsModule,
    MatTooltipModule,
  ],
  providers: [
    StockPlacementService
  ],
  exports: [
    StockPlacementComponent
  ]
})
export class StockPlacementModule { }
