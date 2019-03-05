import { CandidatesService } from './../services/candidates.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
   id: any;
   user = {
      password: null,  
      name: '',        
      email: '',       
      username: '',    
      phone:'',        
      cpf: '',         
      rg: '',          
      birth_date: '', 
   }
   isLoading = false;
   phoneMask: Array<string | RegExp>;
   cpfMask: Array<string | RegExp>;
   rgMask: Array<string | RegExp>;
   dateMask:  Array<string | RegExp>;

   constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: CandidatesService) { }

   ngOnInit() {
      this.loadCandidate();      
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

   loadCandidate(){
      this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.service.getCandidate(this.id).subscribe(response => {
         let updateUser = response.json();
         this.user.name  = updateUser['name'];        
         this.user.email = updateUser['email'];        
         this.user.username = updateUser['username'];    
         this.user.phone = updateUser['phone'];        
         this.user.cpf =  updateUser['cpf'];         
         this.user.rg =  updateUser['rg'];          
         let date = (updateUser['birth_date'] as string).split('-')
         this.user.birth_date = date[2] + '/' + date[1] + '/' + date[0]
      }, 
      error => {
         alert('An unexpected error ocurred.');
      })
   }

   
   onSubmit(){
      //this.user.rg = this.user.rg.replace(/[\.,\-]/g,'');
      if(!this.user.password || !this.user.birth_date || !this.user.name 
         || !this.user.cpf ||  !this.user.rg || !this.user.email){
         Swal.fire('Campo vazio!', 'Nome, data de nascimento, CPF, RG, email,  Senha', 'warning')
         return
      }
      this.isLoading = true;
      let date = this.user.birth_date.split('/')
      this.user.birth_date = date[2] + '-' + date[1] + '-' + date[0]

      this.service.updateCandidate(this.user, this.id)
         .subscribe(
            response => {
               Swal.fire('Candidato atualizado com sucesso!!');
               this.loadCandidate()
               this.isLoading = false;
            }, 
            (error: AppError) => {
               if (error instanceof BadInput) {
                 console.log('bad input');
                 this.isLoading = false;
               }
               else{
                  alert('An unexpected error ocurred.');
                  this.isLoading = false;
               }
            })
   }

}
