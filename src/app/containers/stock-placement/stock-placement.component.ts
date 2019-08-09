import { Component, OnInit } from '@angular/core';

import { IStockInput } from '../../shared/models/IStockInput';
import { ProcurarNomePipe } from '../../shared/pipes/procurar-nome.pipe';
import { ProcuraTipoPipe } from '../../shared/pipes/procura-tipo.pipe';
import { PrcourarMinDatePipe } from '../../shared/pipes/prcourar-min-date.pipe';
import { PrcourarMaxDatePipe } from '../../shared/pipes/prcourar-max-date.pipe';

import { StockPlacementService } from './stock-placement.service';

@Component({
  selector: 'app-stock-placement',
  templateUrl: './stock-placement.component.html',
  styleUrls: ['./stock-placement.component.css']
})
export class StockPlacementComponent implements OnInit {

  isLoading: boolean = true;
  arrayInputs: Array<IStockInput>;

  stockInputs: any[];

  stockInputs2: IStockInput[];
  products: any[];
  persons: any[];

  procuraNome: ProcurarNomePipe;
  procuraTipo: ProcuraTipoPipe;
  procuraMinDate: PrcourarMinDatePipe;
  procuraMaxDate: PrcourarMaxDatePipe;

  selectedStockInput: any;
  selectedStockInputPerson: string;
  ready: boolean = false;
  loadProducts: boolean = false;

  constructor(private _stockPlacementService: StockPlacementService) { }

  ngOnInit() {
    this.getStockInputs();
    this.getpersons();
    this.getAllProducts()
  }

  getpersons(){
    this._stockPlacementService.getPeople()
      .subscribe(resp => {
        this.persons = [ ... resp.body.obj ];
      });
  }

  getAllProducts(){
    this._stockPlacementService.getProducts()
      .subscribe(resp => {
        this.products = [ ... resp.body.obj ];
        this.loadProducts = true;
      });

  }

  productName(id){
    return this.products.find(product => product.id_product == id).name_product
  }

  getStockInputs() {
    this._stockPlacementService.getInputs()
      .subscribe(resp => {
        this.isLoading = false;
        this.stockInputs2 = [ ... resp.body.obj ].reverse();
        this.getStockInputsById(this.stockInputs2[this.stockInputs2.length-1].id_stock);
      });
  }

  getStockInputsById(id) {
    this._stockPlacementService.getStockInputById(id)
      .subscribe(resp => {
        this.selectedStockInput =  resp.body.obj[0];
        this.ready = true;
        this.selectedStockInputPerson = this.stockInputs2.find(obj => obj.id_stock == id).person.name
      });
  }

  deleteStockInput(id){
    this._stockPlacementService.deleteStockInput(id)
      .subscribe(
        resp => {
          this.getStockInputs()
        }
      ),
       (
         error => console.log(error)
      )
  }



}
