import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-stock-placement-maintain',
  templateUrl: './stock-placement-maintain.component.html',
  styleUrls: ['./stock-placement-maintain.component.css']
})
export class StockPlacementMaintainComponent implements OnInit {
  @ViewChild('valueProduct') valueProduct: ElementRef;
  @ViewChild('product') product: ElementRef;
  @ViewChild('quantity') quantity: ElementRef;

  myControl = new FormControl();
  options: string[] = ['Cássio','Ramon','Vinicius','Adriana','Carol','Gatelli','LDS'];
  optionsProdutos: string[] = ['Leite','Arroz','Azeite','Açucar','Feijão','Farinha','Papel higiênico'];
  filteredOptions: Observable<string[]>;

  stockProducts: Array<any> = [
    {id: 1, name: "Arroz", qtd: 30, value: 50.50,},
    {id: 2, name: "Feijão", qtd: 15, value: 40.50,},
    {id: 8, name: "Leite", qtd: 20, value: 60.50,},
    {id: 4, name: "Farinha", qtd: 3, value: 10.50,},
    {id: 5, name: "Amendoim", qtd: 2, value: 18.50,},
    {id: 6, name: "Pamonha", qtd: 4, value: 20.50,},
    {id: 7, name: "Cachaça", qtd: 10, value: 500.50,}
  ];
  selectValue = null;
 

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  removeProduct(index){
    this.stockProducts.splice(index, 1);
  }
  
  addProduct(){
    let productV = this.product.nativeElement.value;
    let quantityV = this.quantity.nativeElement.value;
    let valueProductV = this.valueProduct.nativeElement.value;

    console.log(`${productV},${quantityV},${valueProductV}`);

    let newProduct: any = {
      name: productV,
      qtd: quantityV,
      value: valueProductV
    }

    this.stockProducts.push(newProduct);
  }

}
