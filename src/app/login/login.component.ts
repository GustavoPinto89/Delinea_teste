import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../services/candidates.service';
import Swal from 'sweetalert2'
import * as UserActions from './../redux/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { User } from '../models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   login = {
      username: '',
      password: ''
   }
   isLoading = false;

  constructor(private service: CandidatesService, private store: Store<AppState>, private router: Router) {   }

  ngOnInit() {
  }

  onSubmit(f){
      if(this.login.username && this.login.username != '' && this.login.password && this.login.password != ''){
         this.isLoading = true;
         this.service.login(this.login.username, this.login.password).subscribe(response => {
            if(response.status === 200){
               let credentials = JSON.parse(response['_body']);
               const newState: User = {
                  email: this.login.username,
                  isLogged: true,
                  access_token: credentials['access_token'],
               };
               this.store.dispatch(new UserActions.AddUser(newState));
               this.router.navigate(['/candidates']);
            }
         }, 
         error => {
            this.showModal()
            this.isLoading = false;
         })
      }else{
         Swal.fire('Oops...', 'Preencha todos os campos!!', 'warning')
         this.isLoading = false;
      }
  }

  showModal(){
      Swal.fire({
         title: 'Oops..?',
         text: 'Tente novamente, ou cria uma nova conta',
         type: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Tentar Novamente',
         cancelButtonText: 'Criar nova conta!'
      }).then((result) => {
         if (result.value) {
         return
         } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigate(['/register']);
         }
      })
  }

}

/*
access_token: "KrAEVcvN3kPswP54OibiaKKhmgnqHl"
expires_in: 36000
refresh_token: "jo8e5z7W4pls8B2aD4Bkd00gxgxX4v"
scope: "write read"
token_type: "Bearer"
 */