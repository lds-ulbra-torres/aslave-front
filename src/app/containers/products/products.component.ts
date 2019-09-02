import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { productsService } from './products.service';
import { Product } from '../../shared/models/product';
import { Categorias } from '../../shared/models/categories';
import { ProcurarProductPipe } from '../../shared/pipes/procura-produto.pipe';
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
display: boolean;
displayUp: boolean;

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  toString(value){
    return parseInt(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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
    this.editButton = false;
    this.att_nameValidation = false;
    this.att_selectValidation= false;
    let name = b.name_product;
    let category = b.id_group;

    if(category == ''){
      this.att_selectValidation = true;
    }
    if(name == ''){
      this.att_nameValidation  = true;
    }

    const product = {
      'name_product': b.name_product,
      'unit_price': b.unit_price,
      'id_group': b.id_group,
    };
    this.productServ.updateProduct(product, this.product.id_product)
    .subscribe(
      resp => {
        this.product = null;
        this.getProducts();
        this.toastr.success('O produto foi editado!','Sucesso !',{
          timeOut: 5000
        });
      }, error => {
        this.error = error;
        if(name != '' && category != ''){
          this.toastr.error('O produto '+name+' já existe.', 'Falha no envio!', {
            timeOut: 5000
          });
          this.addButton = true;
        }else{
        this.toastr.error('Verifique os campos.', 'Falha no envio!', {
          timeOut: 5000
        });
        this.addButton = true;}
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
