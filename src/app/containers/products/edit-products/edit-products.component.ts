import { Categorias } from './../../../shared/models/categories';
import { Product } from './../../../shared/models/produto';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProcurarProductPipe } from 'src/app/shared/pipes/procura-produto.pipe';
import { productsService } from '../products.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  constructor(private Router: Router,
              private productServ: productsService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

produtos:Product[];
product: Product;
categories: Categorias[];
categorie: Categorias;
procuraProduct: ProcurarProductPipe;
isLoading: boolean = true;
id: null;
sub: any;

//identificadores de validação
name_valid: boolean = false;
id_valid: boolean = false;
att_selectValidation: boolean = false;
att_nameValidation: boolean = false;
error = '';
sucess = '';

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getById();
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

  getById(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id){
      this.productServ.getproductById(this.id).subscribe(
        resp =>{
          let inputCategory = resp.body.obj[0];
          this.product = inputCategory;  
        }
      )
    }
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
        this.getProducts();
        this.toastr.success('O produto foi editado!','Sucesso !',{
          timeOut: 5000
        }); 
        this.goBack();
      }, error => {
        this.error = error;
        if(name != '' && category != ''){
          this.toastr.error('O produto '+name+' já existe.', 'Falha no envio!', {
            timeOut: 5000
          });
        }else{
        this.toastr.error('Verifique os campos.', 'Falha no envio!', {
          timeOut: 5000
        });
        }
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

  goBack(){
    this.Router.navigate(['produtos']);
  }

}
