import { User } from './../../models/user.model';
import * as UserActions from './../actions/user.actions';

const initialState: User = {
   email: null,
   isLogged: false,
   access_token: null,
}

const newState = (state, newData) => {
   return Object.assign({}, state, newData)
}

export function reducer(state: User = initialState, action: UserActions.Actions){
   console.log(action.type, state)
   switch(action.type) {
      case UserActions.ADD_USER:
         return newState(state, action.payload);
      case UserActions.DELETE_USER:
         return initialState;

      default:
         return state;
   }
}

/*
export function reducer(state: User[] = [initialState], action: UserActions.Actions){
   switch(action.type) {
      case UserActions.ADD_USER:
      console.log(action.payload)
         return [...state, action.payload];
      case UserActions.DELETE_USER:
         return [...state, initialState];
      default:
         return state;
   }
}*/