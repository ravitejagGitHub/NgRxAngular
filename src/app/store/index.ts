import IUserState from './users/users.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userStateKey = 'userState';

export interface IAppState {
  [userStateKey]: IUserState;
}

// export const selectUsersState = (state: IAppState) => state.user;


export const selectUserState = createFeatureSelector<IAppState, IUserState>(userStateKey);

export const selectUserStateUsers =  createSelector(
  selectUserState,
  (state: IUserState) => state.users
);

