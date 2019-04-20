import { Person } from './../models/person';
import { PeopleService } from './../people/people.service';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IStockInput } from './../../domain/IStockInput';
import { ProcurarNomePipe } from './../pipes/procurar-nome.pipe';
import { ProcuraTipoPipe } from '../pipes/procura-tipo.pipe';
import { PrcourarMinDatePipe } from '../pipes/prcourar-min-date.pipe';
import { PrcourarMaxDatePipe } from '../pipes/prcourar-max-date.pipe';
import { StockPlacementService } from './stock-placement.service';

@Component({
  selector: 'app-stock-placement',
  templateUrl: './stock-placement.component.html',
  styleUrls: ['./stock-placement.component.css']
})
export class StockPlacementComponent implements OnInit {

  //arrayInputs: Array<IStockInput>;
  inputs: any[]= [];
  isLoading: boolean = true;
  people: Person[]=[]
  products: any[]=[];
  stockInputs2: any[];
  selectedStockInput: any;
  selectedStockInputPerson: string;
  ready: boolean = false;
  loadProducts: boolean = false;

  procuraNome: ProcurarNomePipe;
  procuraTipo: ProcuraTipoPipe;
  procuraMinDate: PrcourarMinDatePipe;
  procuraMaxDate: PrcourarMaxDatePipe;

  constructor(private _stockPlacementService: StockPlacementService,
              private peopleService: PeopleService) { }

  ngOnInit() {
    this.getInputs();
  }

  onSubmit(form){
    console.log(form.value.fornecedor);
    console.log(form.value.dateInit);
    console.log(form.value.dateEnd);
    console.log(form.value.type);
  }

  getInputs(){
    this._stockPlacementService.getInputs().pipe(first())
    .subscribe(inputs =>{ this.inputs = [... inputs.body.obj]
      this.isLoading = false;
      console.log(inputs);
    });
  }

  getStockInputsById(id) {
    
    this._stockPlacementService.getStockInputById(id)
      .subscribe(resp => {
        this.selectedStockInput =  resp.body.obj[0];
        this.ready = true;
        this.selectedStockInputPerson = this.stockInputs2.find(obj => obj.id_stock == id).person.name
        console.log(this.selectedStockInput);
      });
  }
  productName(id: number){
    return this.products.find(product => product.id_product == id).name_product
  }
  deleteStockInput(id){
    this._stockPlacementService.deleteStockInput(id)
      .subscribe(
        resp => {
          this.getInputs()
        }
      ),
       (
         error => console.log(error)
      )
  }

}
