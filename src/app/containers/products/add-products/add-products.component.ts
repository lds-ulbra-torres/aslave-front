import { first } from 'rxjs/operators';
import { productsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorias } from '../../../shared/models/categories';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private router: Router,
              private toastr:ToastrService,
              private productServ: productsService,) { }

  ngOnInit() {
    this.getCategories();
  }

  categories: Categorias[];
  categorie: Categorias;


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

  getCategories(){
    this.productServ.getProductServ().pipe(first())
    .subscribe(cate =>{ this.categories = [... cate.body.obj] });
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
      this.toastr.success('Produto adicionado', 'Sucesso!',{
        timeOut: 5000
      });
      this.router.navigate(['produtos']);
    },
    error => {
      this.error = error;
      if(name != '' && category != ''){
        this.toastr.error('O produto '+name+' já existe.', 'Falha no envio!', {
          timeOut: 5000
        });
        this.addLoading = false;
        this.addButton = true;
      }else{
      this.toastr.error('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
      this.addLoading = false;
      this.addButton = true;}
    });

  }

  goBack(){
    this.router.navigate(['produtos']);
  }
}
