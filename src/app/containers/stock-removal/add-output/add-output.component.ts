import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { StockRemovalService } from '../stock-removal.service';
import { Router } from '@angular/router';
import { ManageService } from '../../manage/manage.service';
import { StockPlacementService } from '../../stock-placement/stock-placement.service';
import { Product } from 'src/app/shared/models/produto';

@Component({
  selector: 'app-add-output',
  templateUrl: './add-output.component.html',
  styleUrls: ['./add-output.component.css']
})
export class AddOutputComponent implements OnInit {
  @ViewChild('id_user') id_user: ElementRef;

    options: User[]= [];
    products: any[]=[];
    product: any;
    productName: string;
    user: User;
    myControl = new FormControl();
    myProducts = new FormControl();
    filteredOptions: Observable<User[]>;
    filteredProducts: Observable<Product[]>;
    date: string;

    selectValue = null;
  constructor(private toastr: ToastrService,
    private stockRemovalService: StockRemovalService,
    private router: Router,
    private userService: ManageService,
    private stockPlacementService: StockPlacementService) { }

  
  ngOnInit() {
    this.getUsers();
      this.getProducts();
      this.getDate();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    
      this.filteredProducts = this.myProducts.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterProd(value))
      );
      console.log(this.filteredProducts)
      
  }

  getDate(){
    let current = new Date();
    let data = current.toLocaleDateString();
    let splitted = data.split("/", 3);
    this.date = splitted[2] + "-" + splitted[1] + "-" + splitted[0];
    console.log(this.date);
  }

  
  onSubmit(s){
    console.log(s.value.id_user);
    let date = `${this.date}` + "T03:00:00.000Z";
    let name = this.id_user.nativeElement.value;
    let user = this.options.find((person: User) => person.full_name==name);
    console.log(user);

   const output = {
      "id_user": user.id_user,
      "id_product": s.value.id_product,
      "createdAt": date,
      "description": s.value.description,
      "unit_measurement": s.value.unit_measurement,
      "amount_output": s.value.amount_output,
      "unit_price_output": s.value.unit_price_output
    }

    console.log(output);
    this.stockRemovalService.postOutput(output).subscribe((response) => {
      s.reset();
      this.goBack();
      this.toastr.success('Adicionado com sucesso');
      
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error('Não foi possível realizar a operação');
    });

  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.full_name.toLowerCase().includes(filterValue));
  }

  private _filterProd(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(res => res.name_product.toLowerCase().includes(filterValue));
  }

  getUsers(){
    this.userService.getUsers().pipe(first())
    .subscribe(users =>{ this.options = [... users.body.obj]
    });
  }
  goBack(){
    this.router.navigate(['saidas']);
  }
  getProducts(){
    this.stockPlacementService.getProducts().pipe(first())
      .subscribe(products => { 
        this.products = [...products.body.obj]
        console.log(this.products)
      });
  }

  getProductById(id){
    this.stockRemovalService.getproductById(id).pipe(first())
    .subscribe(res =>{
      this.product = res.body.obj;
      this.productName = this.product[0].name_product;
    });
  }
  
 

}
