import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, first } from 'rxjs/operators';
import { Person } from 'src/app/shared/models/person';
import { StockPlacementService } from '../stock-placement.service';
import { PeopleService } from 'src/app/containers/people/people.service';

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
  
  filteredOptions: Observable<Person[]>;

  stockProducts: Array<any> = [];
  selectValue = null;
  options: Person[]= [];
  products: any[]=[];
 

  constructor(private router: Router,
    private _stockPlacementService: StockPlacementService,
    private peopleService: PeopleService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.getPeople();
    this.getAllProducts();
  }

  private _filter(value: string): Person[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  removeProduct(index){
    this.stockProducts.splice(index, 1);
  }
  
  getAllProducts(){
    this._stockPlacementService.getProducts().pipe(first())
      .subscribe(products => this.products = [...products.body.obj]);
  }
  getPeople(){
    this.peopleService.getPeople().pipe(first())
    .subscribe(people =>{ this.options = [... people.body.obj]
    });
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

  goBack(){
    this.router.navigate(['entradas']);
  }
  searchProd(idProd){
    let theProduct:any = this.products.find(product => product.id_product==idProd)
    return theProduct.name_product
  }

}
