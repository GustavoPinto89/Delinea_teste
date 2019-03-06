import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpModule } from '@angular/http';

import { CandidatesService } from  './services/candidates.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CandidatesComponent } from './candidates/candidates.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './redux/reducers/user.reducer';
import { UpdateComponent } from './update/update.component';

@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      NavbarComponent,
      LoginComponent,
      CandidatesComponent,
      UpdateComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      TextMaskModule,
      HttpModule,
      StoreModule.forRoot({
        user: reducer
      }),
      RouterModule.forRoot([
         { path: 'login', component: LoginComponent },
         { path: 'candidates', component: CandidatesComponent },
         { path: 'candidate/:id', component: UpdateComponent },
         { path: 'register', component: RegisterComponent },
      ])
   ],
   providers: [
      CandidatesService
   ],
   bootstrap: [AppComponent]
   })
export class AppModule { }
