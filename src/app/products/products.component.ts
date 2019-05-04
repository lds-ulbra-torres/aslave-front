import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { productsService } from './products.service';
import { Product } from '../models/product';
import { Categorias } from '../models/categories';
import { ProcurarProductPipe } from '../pipes/procura-produto.pipe';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

constructor(private formBuilder: FormBuilder, private productServ:productsService) { }

produtos:Product[];
product: Product;
display: boolean;
displayUp: boolean;
categories: Categorias[];
procuraProduct: ProcurarProductPipe;

//identificadores de validação
name_valid: boolean = false;
id_valid: boolean = false;
att_selectValidation: boolean = false;
att_nameValidation: boolean = false;

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

   onSubmit(p){
    this.name_valid = false;
    this.id_valid = false;
    let name = p.value.name_product;
    let category = p.value.id_group;
    
    if(category == ''){
      this.id_valid = true;
    }
    if(name == ''){
      this.name_valid = true;
    }

    const product = {
      'name_product': p.value.name_product,
      unit_price: '0',
      'id_group': p.value.id_group,
    };  

    console.log(product);

    this.productServ.postProduct(product).subscribe((response) => {
      p.reset();
      this.getProducts();
      this.display = !this.display;
      console.log(response);
    }, error => console.log(error))

  }

  select(p){
    this.product = Object.assign({},p);
    console.log(this.product.id_group);
  }

  getCategories(){
    this.productServ.getProductServ().pipe(first())
    .subscribe(cate =>{ this.categories = [... cate.body.obj] });
  }

  getProducts(){
    this.productServ.getProdutoServ().pipe(first())
    .subscribe(cate =>{ this.produtos = [... cate.body.obj] });
  }

  deleteProduct(){
    this.productServ.deleteProduct(this.product.id_product)
      .subscribe(
        resp => {
          this.produtos = null
          this.getProducts();
        }
      ),
       (
         error => console.log(error)
      )
  }

  updateProduct(b){
    this.att_nameValidation = false;
    this.att_selectValidation= false;
    let name = b.value.name_product;
    let category = b.value.id_group;
    
    if(category == ''){
      this.att_selectValidation = true;
    }
    if(name == ''){
      this.att_nameValidation  = true;
    }



    const product = {
      'name_product': b.value.name_product,
      'unit_price': b.value.unit_price,
      'id_group': b.value.id_group,
    };
    this.productServ.updateProduct(product, this.product.id_product)
    .subscribe(
      resp => {
        this.product = null;
        this.displayUp = !this.displayUp;
        this.getProducts();
      }
    );
  }

}
