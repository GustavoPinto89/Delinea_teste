
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store';
import { User } from './../../models/user.model'

export const ADD_USER      = '[USER] ADD';
export const DELETE_USER   = '[USER] DELETE';

export class AddUser implements Action {
   readonly type = ADD_USER;

   constructor(public payload: User){}
}

export class DeleteUser implements Action {
   readonly type = DELETE_USER; 
}

export type Actions = AddUser | DeleteUser