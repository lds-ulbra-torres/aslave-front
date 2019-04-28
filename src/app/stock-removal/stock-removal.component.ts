import { ManageService } from './../manage/manage.service';
import { StockPlacementService } from './../stock-placement/stock-placement.service';
import { PeopleService } from 'src/app/people/people.service';
import { first, map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { StockRemovalService } from './stock-removal.service';
import { PrcourarMinDatePipe } from '../pipes/prcourar-min-date.pipe';
import { PrcourarMaxDatePipe } from '../pipes/prcourar-max-date.pipe';
import { Person } from '../models/person';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ProductsComponent } from '../products/products.component';
import { Single } from '../models/single';

@Component({
  selector: 'app-stock-removal',
  templateUrl: './stock-removal.component.html',
  styleUrls: ['./stock-removal.component.css']
})
export class StockRemovalComponent implements OnInit {

  stockOut: any[];
  procuraMinDate: PrcourarMinDatePipe;
  procuraMaxDate: PrcourarMaxDatePipe;
  myControl = new FormControl();
  isLoading: boolean = true;
  temp: any;
  output: Single;
  product: any;
  productName: string;

  
  filteredOptions: Observable<User[]>;

  selectValue = null;
  options: User[]= [];
  products: any[]=[];

  displayRemoval: boolean = true;
  constructor(private stockRemovalService: StockRemovalService,
              private userService: ManageService,
              private stockPlacementService: StockPlacementService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.getUsers();
    this.getRemoval();
    this.getProducts();
   
    
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.full_name.toLowerCase().includes(filterValue));
  }

  select(out){
    this.temp = Object.assign({}, out);
  }

  onDisplayRemoval(){
    this.displayRemoval = !this.displayRemoval;
  }
  
  getUsers(){
    this.userService.getUsers().pipe(first())
    .subscribe(users =>{ this.options = [... users.body.obj]
    });
  }
  getProducts(){
    this.stockPlacementService.getProducts().pipe(first())
      .subscribe(products => this.products = [...products.body.obj]);
  }

  getProductById(id){
    this.stockRemovalService.getproductById(id).pipe(first())
    .subscribe(res =>{
      this.product = res.body.obj;
      this.productName = this.product[0].name_product;
    });
  }
  getById(out){
    this.stockRemovalService.getStockOutputById(out.id_stock).pipe(first())
    .subscribe(output => {
      this.output = output.body.obj;
      console.log(this.output.unit_meansure.name);
      this.getProductById(this.output.id_product);
      
    }), (error => console.log(error));
  }
  getRemoval(){
    this.stockRemovalService.getRemoval().pipe(first())
    .subscribe(stockOut =>{ this.stockOut = [... stockOut.body.obj] 
    this.isLoading = false;
    });
  }

  onSubmit(s){
    console.log(s);
    let date = `${s.value.createdAt}` + "T00:00:00.000Z";
    console.log(date);
   const output = {
      "id_user": s.value.id_user,
      "id_product": s.value.id_product,
      "createdAt": date,
      "description": s.value.description,
      "unit_measurement": s.value.unit_measurement,
      "amount_output": s.value.amount_output,
      "unit_price_output": "1.50"
    }

    this.stockRemovalService.postOutput(output).subscribe((response) => {
      s.reset();
      this.getRemoval();
      this.displayRemoval = !this.displayRemoval;
      console.log(response);
    }, error => console.log(error))

  }

  deleteOutput(){
    this.stockRemovalService.deleteOutput(this.temp.id_stock)
      .subscribe(
        resp => {
          this.temp = null
          this.getRemoval();
        }
      ),
       (
         error => console.log(error)
      )
  }
}