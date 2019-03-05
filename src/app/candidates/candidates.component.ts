import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../services/candidates.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { AppState } from './../app.state';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

   candidates: any;
   loggedUser: Observable<User>;

   constructor(private store: Store<AppState>, private service: CandidatesService, private route: Router) { 
      this.loggedUser = store.select('user');
   }

   ngOnInit() {
      this.loadCandidates();
   }

   deleteCandidate(id){


      let token;
      let isLogged;
      this.loggedUser.subscribe((User: User )=> {
         token = User.access_token
         isLogged = User.isLogged
      });
      if(isLogged){

         Swal.fire({
            title: 'Confirmar Operação',
            text: 'Deseja excluir este candidato?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
         }).then((result) => {
            if (result.value) {
               this.service.deleteCandidate(id, token).subscribe(response => {
                  if(response.status === 204){
                     this.loadCandidates();
                     Swal.fire('OK!', 'Candidato excluído com sucesso!!')
                  }
               })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
               return
            }
         })
      }
   }

   loadCandidates(){
      this.service.getCandidates()
         .subscribe(response => {
            this.candidates = response.json();
      }, 
      error => {
         alert('An unexpected error ocurred.');
      })
   }

   updateCandidate(id){
      this.route.navigate(['/candidate', id])
   }

}
