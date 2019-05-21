import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { productsService } from './products.service';
import { Product } from '../models/product';
import { Categorias } from '../models/categories';
import { ProcurarProductPipe } from '../pipes/procura-produto.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

constructor(private formBuilder: FormBuilder, 
            private productServ:productsService,
            private toastr: ToastrService
  ) { }

produtos:Product[];
product: Product;
display: boolean;
displayUp: boolean;
categories: Categorias[];
categorie: Categorias;
procuraProduct: ProcurarProductPipe;
isLoading: boolean = true;


//identificadores de validação
name_valid: boolean = false;
id_valid: boolean = false;
att_selectValidation: boolean = false;
att_nameValidation: boolean = false;
error = '';
sucess = '';
addLoading: boolean = false;
addButton: boolean = true;
editLoading: boolean = false;
editButton: boolean = true;

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
    this.addLoading = true;
    this.addButton = false;
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

    this.productServ.postProduct(product).subscribe((response) => {
      p.reset();
      this.getProducts();
      this.display = !this.display;
      this.toastr.success('Produto adicionado', 'Sucesso!',{
        timeOut: 5000
      });
      this.addLoading = false;
      this.addButton = true;
    },
    error => {
      this.error = error;
      this.toastr.error('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
      this.addLoading = false;
      this.addButton = true;
    });

  }

  select(p){
    this.product = Object.assign({},p);
  }
  
  getCategories(){
    this.productServ.getProductServ().pipe(first())
    .subscribe(cate =>{ this.categories = [... cate.body.obj] });
  }

  getProducts(){
    this.productServ.getProdutoServ().pipe(first())
    .subscribe(cate =>{ this.produtos = [... cate.body.obj]
    this.isLoading = false;
    this.orderByName();
    })
  }

  deleteProduct(){
    this.isLoading = true;
    if(this.product.amount == 0){
    this.productServ.deleteProduct(this.product.id_product)
      .subscribe(
        resp => {
          this.produtos = null
          this.getProducts();
          this.toastr.success('O produto '+this.product.name_product+' foi deletado!','',{
            timeOut: 5000
          });
          this.isLoading = false;
        },error => {
          this.error = error;
          this.toastr.warning('', 'Não foi possível deletar o produto.', {
            timeOut: 7000
          });
          this.isLoading = false;
        });
      }else{
        this.toastr.warning('Este produto possui registros de Entrada/Saida.', 'Não foi possível deletar o produto.', {
          timeOut: 7000
        });
        this.isLoading = false;
      }
  }

  updateProduct(b){
    this.editLoading = true;
    this.editButton = false;
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
        this.toastr.success('O produto foi editado!','Sucesso !',{
          timeOut: 5000
        });
        this.addLoading = false;
        this.addButton = true;
      },error => {
        this.error = error;
        this.toastr.error('Verifique os campos.', 'Falha no envio!', {
          timeOut: 7000
        });
        this.editLoading = false;
        this.editButton = true;
      });
  }

  orderByName(){
    this.produtos.sort((a: Product, b:Product)=>{
      if(a.name_product.toLowerCase() > b.name_product.toLowerCase()) {
        return 1;
      } else if(a.name_product.toLowerCase() < b.name_product.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    }) 
  }

}
