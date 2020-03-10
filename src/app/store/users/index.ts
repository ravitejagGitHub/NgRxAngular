import { Action, createSelector } from '@ngrx/store';

import IUserState from './users.state';
import {reducer } from './users.reducer';
import IUser from './users.model';

export function UsersReducer(state: IUserState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectUsers =  createSelector(
  (state: IUserState) => state,
  (state: IUserState) => state.users
);

export const selectSelectedUser =  createSelector(
  (state: IUserState) => state,
  (state: IUserState) => state.selectedUser
);

export const selectUserError =  createSelector(
  (state: IUserState) => state,
  (state: IUserState) => state.userError
);
export const totalUsers =  createSelector(
  selectUsers,
  (users: IUser[]) => users?.length
);

