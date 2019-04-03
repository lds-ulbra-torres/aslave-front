import { Categorias } from './../models/categories';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from './categories.service';
import { ProcurarCategoriaPipe } from '../pipes/procurar-categoria.pipe';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private CategoriServ:CategoriesService) { }

  categories: Categorias[];
  category: Categorias;
  procura: ProcurarCategoriaPipe;
  display: boolean;
  displayUp: boolean;

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
    console.log(p);
    
    const category = {
      'name_group': p.value.name
    };  

    console.log(category);

    this.CategoriServ.postCategory(category).subscribe((response) => {
      p.reset();
      this.getCategories();
      this.display = !this.display;
      console.log(response);
    }, error => console.log(error))

  }

  select(p){
    this.category = Object.assign({},p);
    console.log(this.category.id_group);
  }

  updateCategory(b){
    const category = {
      'name_group': b.value.name_group
    };
    this.CategoriServ.updateCategory(category, this.category.id_group)
    .subscribe(
      resp => {
        this.category = null;
        this.displayUp = !this.displayUp;
        this.getCategories();
      }
    );
  }
  

  deleteCategory(){
    this.CategoriServ.deleteCategory(this.category.id_group)
      .subscribe(
        resp => {
          this.categories = null
          this.getCategories();
        }
      ),
       (
         error => console.log(error)
      )
  }
 
}