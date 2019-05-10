import { Categorias } from './../models/categories';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from './categories.service';
import { ProcurarCategoriaPipe } from '../pipes/procurar-categoria.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
              private CategoriServ:CategoriesService,
              private toastr: ToastrService) { }

  categories: Categorias[];
  category: Categorias;
  procura: ProcurarCategoriaPipe;
  display: boolean;
  displayUp: boolean;
  //Validação de formulário
  name_valid: boolean = false;
  att_nameValidation: boolean = false;
  error: '';

  ngOnInit() {
    this.getCategories();
  }
  getCategories(){
    this.CategoriServ.getCategoriesServ().pipe(first())
    .subscribe(cate =>{ this.categories = [... cate.body.obj] });
  }

  onDisplay(){
    this.display = !this.display;
  }

  onDisplayUp(){
    this.displayUp = !this.displayUp;
  }

  onSubmit(p){
    this.name_valid = false;
    let name = p.value.name_group;
    if(name == ''){
      this.name_valid = true;
    }
    const category = {
      'name_group': p.value.name_group
    };  

    this.CategoriServ.postCategory(category).subscribe((response) => {
      p.reset();
      this.getCategories();
      this.display = !this.display;
      console.log(response);
      this.toastr.success('Categoria adicionada', 'Sucesso!', {
        timeOut: 5000
      });
    }, error => {
      this.error = error;
      this.toastr.error('Verifique os campos.', 'Falha na envio!', {
        timeOut: 5000
      });
    });

  }

  select(p){
    this.category = Object.assign({},p);
  }

  updateCategory(b){
    this. att_nameValidation = false;
    let name = b.value.name_group;

    if(name == ''){
      this.att_nameValidation = true;
    }

    const category = {
      'name_group': b.value.name_group
    };
    this.CategoriServ.updateCategory(category, this.category.id_group)
    .subscribe(
      resp => {
        this.category = null;
        this.displayUp = !this.displayUp;
        this.getCategories();
        this.toastr.success('A categoria foi editada.', 'Sucesso!', {
          timeOut: 5000
        });
      },error => {
        this.error = error;
        this.toastr.error('Verifique os campos.', 'Falha no envio!', {
          timeOut: 7000
        })
      }); 
  }
  
  deleteCategory(){
    this.CategoriServ.deleteCategory(this.category.id_group)
      .subscribe(
        resp => {
          this.categories = null
          this.getCategories();
          this.toastr.warning('A categoria '+this.category.name_group+' foi deletada!','',{
            timeOut: 5000
          });
        },error => {
          this.error = error;
          this.toastr.warning('', 'Você não pode excluir uma categoria que está em uso.', {
            timeOut: 7000
          });
        });
  }
 
}