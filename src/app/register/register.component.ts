import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../services/candidates.service';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import Swal from 'sweetalert2'
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

   user = {
      password: null,       //(string)
      name: '',        // (string),
      email: '',            // (string),
      username: '',         // (string),
      phone:'',             // (string),
      cpf: '',              // (string),
      rg: '',               // (integer),
      birth_date: '',       // (string),
   };
   phoneMask: Array<string | RegExp>;
   cpfMask: Array<string | RegExp>;
   rgMask: Array<string | RegExp>;
   dateMask:  Array<string | RegExp>;
   isLoading = false;
   userss:  Observable<User>

   constructor(private service: CandidatesService, private store: Store<AppState>) { 
      this.userss = store.select('user')
   }

   ngOnInit(): void {
      this.phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      this.cpfMask   = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
      this.rgMask    = [ /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
      this.dateMask  = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
   }

   clearValues(){
      this.user = {
         password: null,  
         name: '',        
         email: '',       
         username: '',    
         phone:'',        
         cpf: '',         
         rg: '',          
         birth_date: '',  
      };
   }

   onSubmit(){
      if(!this.user.password || !this.user.birth_date || !this.user.name 
         || !this.user.cpf ||  !this.user.rg || !this.user.email){
         Swal.fire('Campo vazio!', 'Nome, data de nascimento, CPF, RG, email,  Senha', 'warning')
         return
      }
      this.isLoading = true;
      let date = this.user.birth_date.split('/')
      this.user.birth_date = date[2] + '-' + date[1] + '-' + date[0]
      this.user.rg = this.user.rg.replace(/[\.,\-]/g,'');
      
      this.service.createCandidate(this.user)
         .subscribe(
            response => {
               this.isLoading = false;
               Swal.fire('Candidato cadastrado com sucesso!!');
               this.clearValues()
            }, 
            (error: AppError) => {
               if (error instanceof BadInput) {
                 this.isLoading = false;
               }
               else{
                  alert('An unexpected error ocurred.');
                  this.isLoading = false;
               }
            })
   }


}
