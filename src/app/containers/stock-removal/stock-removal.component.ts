import { ToastrService } from 'ngx-toastr';
import { ManageService } from '../manage/manage.service';
import { StockPlacementService } from '../stock-placement/stock-placement.service';
import { PeopleService } from 'src/app/containers/people/people.service';
import { first, map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { StockRemovalService } from './stock-removal.service';
import { PrcourarMinDatePipe } from '../../shared/pipes/prcourar-min-date.pipe';
import { PrcourarMaxDatePipe } from '../../shared/pipes/prcourar-max-date.pipe';
import { Person } from '../../shared/models/person';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { ProductsComponent } from '../products/products.component';
import { Single } from '../../shared/models/single';
import { MaxDatePipe } from 'src/app/shared/pipes/max-date.pipe';
import { MinDatePipe } from 'src/app/shared/pipes/min-date.pipe';

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
  unit: string;
  user: User;

  minDate: MinDatePipe;
  maxDate: MaxDatePipe;
  
  filteredOptions: Observable<User[]>;

  selectValue = null;
  options: User[]= [];
  products: any[]=[];

  displayRemoval: boolean = true;
  constructor(private stockRemovalService: StockRemovalService,
              private userService: ManageService,
              private stockPlacementService: StockPlacementService,
              private toastr: ToastrService) { }

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
      this.getProductById(this.output.id_product);
      this.user = this.options.find(person => person.id_user== this.output.id_user);
      console.log(this.user);
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
    let user = this.options.find(person => person.full_name==s.value.id_user);
    console.log(user);
    console.log(date);
   const output = {
      "id_user": user.id_user,
      "id_product": s.value.id_product,
      "createdAt": date,
      "description": s.value.description,
      "unit_measurement": s.value.unit_measurement,
      "amount_output": s.value.amount_output,
      "unit_price_output": s.value.unit_price
    }

    console.log(output);
    this.stockRemovalService.postOutput(output).subscribe((response) => {
      s.reset();
      this.getRemoval();
      this.toastr.success('Adicionado com sucesso');
      this.displayRemoval = !this.displayRemoval;
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error('Não foi possível realizar a operação');
    });

  }

  mostrar(id){
    console.log(id);
  }
  updateOutput(u){
    let date = `${u.createdAt}`;
    console.log(u);

    let number = parseInt(u.amount_output);
    let product = parseInt(u.id_product);

   const output = {
      "id_user": u.id_user,
      "id_product": product,
      "createdAt": date,
      "description": u.description,
      "unit_measurement": u.unit_measurement,
      "amount_output": number,
      "unit_price_output": u.unit_price_output
    }
    console.log(output);
    this.stockRemovalService.updateOutput(output, u.id_stock).subscribe(
      resp =>{
        this.toastr.success('Editado com sucesso');
        this.getRemoval();
        console.log(resp);
      }
    ),(
      error => {
        console.log(error);
        this.toastr.error('Não foi possível realizar a operação');
      }
   )
  }
  deleteOutput(){
    this.stockRemovalService.deleteOutput(this.temp.id_stock)
      .subscribe(
        resp => {
          this.toastr.success('Deletado com sucesso');
          this.temp = null
          this.getRemoval();
        }
      ),
       (
         error => {
           console.log(error);
           this.toastr.error('Não foi possível realizar a operação');
        }
      )
  }
}