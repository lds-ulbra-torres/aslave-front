import { Component, OnInit } from '@angular/core';
import { ProcurarCategoriaPipe } from '../../../shared/pipes/procurar-categoria.pipe';
import { Categorias } from '../../../shared/models/categories';
import { FormBuilder } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
    isLoading: boolean = true;
    addLoading: boolean = false;
    editLoading: boolean = false;
    addButton: boolean = true;
    editButton: boolean = true;


  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.CategoriServ.getCategoriesServ().pipe(first())
    .subscribe(cate =>{ this.categories = [... cate.body.obj]
    this.isLoading = false;
     });
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
      this.addButton = true;
      this,this.goBack();
    }, error => {
      this.error = error;
      if(name != ''){
        this.toastr.error('O produto '+name+' já existe.', 'Falha no envio!', {
          timeOut: 5000 
        });
        this.editButton = true;
      }else{
      this.toastr.error('Verifique os campos.', 'Falha no envio!', {
        timeOut: 5000
      });
      }
    });
  }

  goBack(){
    this.router.navigate(['categorias']);
  }

}
