import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

import { StockPlacementService } from '../stock-placement.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-stock-placement-maintain',
  templateUrl: './stock-placement-maintain.component.html',
  styleUrls: ['./stock-placement-maintain.component.css']
})
export class StockPlacementMaintainComponent implements OnInit {
  @ViewChild('namePerson') namePerson: ElementRef;
  @ViewChild('typeStock') typeStock: ElementRef;
  @ViewChild('dateStock') dateStock: ElementRef;
  @ViewChild('valueProduct') valueProduct: ElementRef;
  @ViewChild('product') product: ElementRef;
  @ViewChild('quantity') quantity: ElementRef;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  stockProducts: Array<any> = [];
  selectValue = null;

  products: Array<any> = [];
  people: Array<any> = [];
  totalSumValue:number = 0;

  nameValidation: boolean = false;
  typeValidation: boolean = false;
  dateValidation: boolean = false;
  productValidation: boolean = false;
  amountValidation: boolean = false;
  valueValidation: boolean = false;
  sub: any;
  id = null;

  constructor(private router: Router, private route: ActivatedRoute, private _stockPlacementService: StockPlacementService) { }

  ngOnInit() {
    this.getAllPeople();
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  getByID(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) {
      this._stockPlacementService.getStockInputById(this.id)
        .subscribe(resp => {
          moment.locale('pt-br')
          let inputStock = resp.body.obj[0];
          
          this.namePerson.nativeElement.value = this.people.find(obj => obj.id_people == inputStock.id_people).name;
          this.typeStock.nativeElement.value = inputStock.input_type;
          this.totalSumValue = inputStock.sum_value;
          this.dateStock.nativeElement.value = moment(inputStock.input_date).format("YYYY-MM-DD");
          resp.body.obj[0].stock_input_products.map( obj => {
            this.stockProducts.push({
              id_product: parseInt(obj.id_product),
              id_stock: parseInt(obj.id_stock),
              unit_price_input: obj.unit_price_input,
              amount_input: obj.amount_input
            });
          })
        }, error => console.log(error));
    }
  }

  getAllProducts(){
    this._stockPlacementService.getProducts()
      .subscribe(resp => {
        this.products = [ ... resp.body.obj ];
      });
      
  }

  getAllPeople(){
    //work, but...
    this._stockPlacementService.getPeople()
      .subscribe(resp => {
        this.people = [ ... resp.body.obj ];
         
        this.people.forEach(person => {
          this.options.push(person.name);
        });
        this.options.sort();
        
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    
          this.getAllProducts();
          this.initialSumValue();
          this.getByID();
      });
  }

  searchProd(idProd){
    let theProduct:any = this.products.find(product => product.id_product==idProd)
    if (theProduct)
      return theProduct.name_product.toUpperCase();
    return false;
  }
  
  addProduct(): boolean{
    this.productValidation = false; 
    this.amountValidation = false;
    this.valueValidation = false;

    let productV = this.product.nativeElement.value;
    let quantityV = this.quantity.nativeElement.value;
    let valueProductV = parseFloat(this.valueProduct.nativeElement.value);

    if (productV=='')
      this.productValidation = true;
    if (quantityV=='')
      this.amountValidation = true;
    if (isNaN(valueProductV))
      this.valueValidation = true;

    if (this.productValidation || this.amountValidation || this.valueValidation )
      return false;

    let newProduct: any = {
      id_product: parseInt(productV),
      unit_price_input: valueProductV,
      amount_input: quantityV
    }
    this.product.nativeElement.value = '';
    this.quantity.nativeElement.value = '';
    this.valueProduct.nativeElement.value = '';
    this.stockProducts.push(newProduct);
    this.initialSumValue();
    return true;
  }

  removeProduct(index){
    this.stockProducts = this.stockProducts.filter( (item, i) => index !== i ? item : null);
    this.initialSumValue();
  }
  
  initialSumValue(){
    this.totalSumValue = 0;
    this.stockProducts.forEach(product => {
      this.totalSumValue += product.unit_price_input*product.amount_input;
    });
  }

  goBack(){
    this.router.navigate(['admin/entradas']);
  }

  onSubmit(form): boolean {
    this.nameValidation = false; this.typeValidation = false; this.dateValidation = false;
    let namePersonV = this.namePerson.nativeElement.value;
    let typeStockV = this.typeStock.nativeElement.value;
    let dateStockV = this.dateStock.nativeElement.value;
 
    if (!this.options.includes(namePersonV)) 
      this.nameValidation = true
    if (typeStockV==0)
      this.typeValidation = true
    if (dateStockV=='')
      this.dateValidation = true

    if (this.nameValidation || this.typeValidation || this.dateValidation)
      return false;

    let selectedPerson = this.people.find(person => person.name==namePersonV)
    let totalValor = this.totalSumValue.toString()
    
    let stock: any = {
      input_date: dateStockV+'T12:01:01.000Z',
      input_type: typeStockV,
      sum_value: totalValor,
      id_people: selectedPerson.id_people,
      stock_input_products: this.stockProducts
    }

    if(this.id) {
      this._stockPlacementService.putStockInput(this.id, stock).subscribe(
        data => this.goBack(), 
        error => console.log('error ',error),
      )
    } else {
      this._stockPlacementService.postStockInput(stock).subscribe(
        data => this.goBack(), 
        error => console.log('error ',error),
      )
    }
    
  }

}