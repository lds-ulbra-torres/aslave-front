import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';
import { Categorias } from '../../../shared/models/categories';
import { ProcurarCategoriaPipe } from '../../../shared/pipes/procurar-categoria.pipe';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesComponent } from '../categories.component';
@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private CategoriServ:CategoriesService,
    private toastr: ToastrService) { }

  categories: Categorias[];
  category: Categorias;
  procura: ProcurarCategoriaPipe;
  display: boolean;
  displayUp: boolean;
  id: null;
  sub: any;
  

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
    this.getById();
  }

  getById(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id){
      this.CategoriServ.getCategoriesId(this.id).subscribe(
        resp =>{
          let inputCategory = resp.body.obj[0];
          this.category = inputCategory;  
        }
      )
    }
  }

  getCategories(){
    this.CategoriServ.getCategoriesServ().pipe(first())
    .subscribe(cate =>{ this.categories = [... cate.body.obj]
    this.isLoading = false;
     });
  }

  updateCategory(b){
    this.editButton = false;
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
        this.editLoading = false;
        this.editButton = true;
        this.goBack();
      },error => {
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
        this.editButton = false;
        this.editButton = true;
        }
      });
  }

  goBack(){
    this.router.navigate(['categorias']);
  }

}
