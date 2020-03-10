import { Action, createSelector } from '@ngrx/store';

import IUserState from './users.state';
import { reducer } from './users.reducer';
import IUser from './users.model';
import { IAppState } from '..';

export function UsersReducer(state: IUserState | undefined, action: Action) {
  return reducer(state, action);
}

export const getUserState = createSelector(
  (state: IAppState) => state.userState,
  (userState: IUserState) => userState
);

export const selectUsers = createSelector(
  getUserState,
  (state: IUserState) => state.users
);

export const selectSelectedUser = createSelector(
  getUserState,
  (state: IUserState) => state.selectedUser
);

export const selectUserError = createSelector(
  getUserState,
  (state: IUserState) => state.userError
);
export const totalUsers = createSelector(
  selectUsers,
  (users: IUser[]) => users?.length
);
