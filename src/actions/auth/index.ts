import { AuthActionTypes } from '../types';

export interface SignInAction {
  type: AuthActionTypes.SignIn;
  userId: string;
}

export interface SignOutAction {
  type: AuthActionTypes.SignOut;
}

export const signIn = (userId: string): SignInAction => {
  return {
    type: AuthActionTypes.SignIn,
    userId: userId
  };
};

export const signOut = (): SignOutAction => {
  return {
    type: AuthActionTypes.SignOut
  };
};

export type AuthActions = SignInAction | SignOutAction;
