import { BadInput } from './../common/bad-input';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppError } from '../common/app-error';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
   url: string;
   client_id: string;
   client_secret: string;


   constructor(private http: Http) { 
      this.url = environment.url;
      this.client_id = environment.client_id
      this.client_secret = environment.client_secret
   }

   createCandidate(post){
      return this.http.post(this.url, post).pipe(
         catchError((error: Response) => {
            if(error.status === 400)
               return Observable.throw(new BadInput(error.json()));
            return Observable.throw(new AppError(error.json()))
         })
      )    
   }

   
   updateCandidate(patch, id){
      return this.http.patch(this.url + `${id}`, patch).pipe(
         catchError((error: Response) => {
            if(error.status === 400)
               return Observable.throw(new BadInput(error.json()));
            return Observable.throw(new AppError(error.json()))
         })
      )    
   }

   getCandidates(){
      return this.http.get(this.url).pipe(
         catchError((error: Response) => {
            if(error.status === 400)
               return Observable.throw(new BadInput(error.json()));
            return Observable.throw(new AppError(error.json()))
         })
      )   
   }

   getCandidate(id){
      return this.http.get(this.url + '' +id).pipe(
         catchError((error: Response) => {
            if(error.status === 400)
               return Observable.throw(new BadInput(error.json()));
            return Observable.throw(new AppError(error.json()))
         })
      )
   }

   deleteCandidate(id, token){
      let headers = new Headers();
      headers.append('Authorization', `Bearer+${token}`);  
      let options = new RequestOptions({ headers: headers});
      return this.http.delete(this.url + `${id}/delete`, options)
      .pipe(
         catchError((error: Response) => {
            console.log(error.json())
            if(error.status === 400)
               return Observable.throw(new BadInput(error.json()));

            return Observable.throw(new AppError(error.json()))
         })
      )

   }

   login(user, pasw){
      let body = "grant_type=password&client_id=?&client_secret=?&username=?&password=?"
      let string = [this.client_id, this.client_secret, user, pasw]

      for (var i = 0; i < string.length; i++) {
         body = body.replace('?', string[i]);
      }

      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');    
      let options = new RequestOptions({ headers: myHeaders});

      return this.http.post('https://delineaapi.herokuapp.com/o/token/', body, options)
      .pipe(
         catchError((error: Response) => {
            console.log(error.json())
            if(error.status === 400)
               return Observable.throw(new BadInput(error.json()));

            return Observable.throw(new AppError(error.json()))
         })
      )

   }

   


}
