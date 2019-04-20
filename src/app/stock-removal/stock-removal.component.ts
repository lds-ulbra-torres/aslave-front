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
  
  filteredOptions: Observable<User[]>;

  //stockProducts: Array<any> = [];
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
  getRemoval(){
    this.stockRemovalService.getRemoval().pipe(first())
    .subscribe(stockOut =>{ this.stockOut = [... stockOut.body.obj] 
    this.isLoading = false;
    });
  }
  searchUser(idProd){
    let theProduct:any = this.products.find(product => product.id_product==idProd)
    return theProduct.name_product
  }
  onSubmit(s){
    console.log(s);
    let output = new FormData();
    
    output.append('id_product', s.value.id_product);
    //output.append('unit_price_output', s.value.unit_price_output)
    output.append('amount_output', s.value.amount_output);
    output.append('unit_measurement', s.value.unit_measurement);
    output.append('description', s.value.description);
    output.append('id_user', s.value.id_user);
    console.log(JSON.stringify(output));
    
    this.stockRemovalService.postOutput(output).subscribe((response) => {
      s.reset();
      this.getRemoval();
      this.displayRemoval = !this.displayRemoval;
      console.log(response);
    }, error => console.log(error))

  }
}