import {
  createReducer,
  on,
  Action,
  createSelector,
  MemoizedSelector,
  State
} from '@ngrx/store';

import IUserState, { initializeState } from './users.state';
import * as UsersActions from './users.actions';
import IUser from './users.model';

export const initialState = initializeState();

const successCreateUserAction = (state: IUserState, payload) => {
  return {
    ...state,
    users: [...state.users, payload.user],
    selectedUser: { ...payload.user }
  };
};

const successUsersAction = (state: IUserState, { users }) => {
  return {
    ...state,
    users: [...state.users, ...users]
  };
};

const successGetUserAction = (state: IUserState, { user }) => {
  return {
    ...state,
    selectedUser: user,
    userError: null
  };
};

const deleteUserAction = (state: IUserState, { id }) => {
  return {
    ...state,
    users: state.users.filter(user => user.id !== id),
    userError: null
  };
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.BeginGetUsersAction, state => state),
  on(UsersActions.SuccessGetUsersAction, successUsersAction),
  on(UsersActions.SuccessGetUserAction, successGetUserAction),
  on(UsersActions.SuccessCreateUserAction, successCreateUserAction),
  on(UsersActions.DeleteUserAction, deleteUserAction),

  on(UsersActions.ErrorUserAction, (state: IUserState, error: Error) => {
    return { ...state, userError: error };
  })
);


