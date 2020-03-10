import IUserState from './users/users.state';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap
} from '@ngrx/store';
import { reducer } from './users/users.reducer';

export const userStateKey = 'userState';
export const appsStateKey = 'appState';
export interface IAppState {
  [userStateKey]: IUserState;
}

export const reducers: ActionReducerMap<IAppState> = {
  [userStateKey]: reducer
};

export const getAppState = createFeatureSelector<IAppState>(
  appsStateKey
);

export const getUserState = createSelector(
  getAppState,
  (state: IAppState) => state[userStateKey]
);

export const selectUserStateUsers = createSelector(
  getUserState,
  (state: IUserState) => state.users
);

