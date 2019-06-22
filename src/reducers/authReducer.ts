import { AuthActions } from '../actions';
import { AuthActionTypes } from '../actions/types';

export interface AuthStoreState {
  isSignedIn: boolean;
  userId?: string;
}

const INITIAL_STATE: AuthStoreState = {
  isSignedIn: null,
  userId: null
};

export const authReducer = (
  state: AuthStoreState = INITIAL_STATE,
  action: AuthActions
): AuthStoreState => {
  switch (action.type) {
    case AuthActionTypes.SignIn:
      return { ...state, isSignedIn: true, userId: action.userId };
    case AuthActionTypes.SignOut:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
