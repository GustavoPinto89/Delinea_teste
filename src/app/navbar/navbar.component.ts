import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { AppState } from './../app.state';
import * as UserActions from './../redux/actions/user.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   loggedUser:  Observable<User>

   constructor(private store: Store<AppState>, private router: Router) { 
      this.loggedUser = store.select('user')
   }

   ngOnInit() {
   }

   logOut(){
      this.store.dispatch(new UserActions.DeleteUser())
      this.router.navigate(['/login']);
   }

}
