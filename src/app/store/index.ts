import IUserState from './users/users.state';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap
} from '@ngrx/store';
import { userReducer } from './users/users.reducer';

import * as fromUserEntity from './users/entity-adapter/entity-reducer';

export const userStateKey = 'userState';
export const userEntityStateKey = 'userEnitityState';
export const appsStateKey = 'appState';

export interface IAppState {
  [userStateKey]: IUserState;
  [userEntityStateKey]: fromUserEntity.IEntityUserState;
}

export const reducers: ActionReducerMap<IAppState> = {
  [userStateKey]: userReducer,
  [userEntityStateKey]: fromUserEntity.entityReducer
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


/*** Entity Adaptor *******************************************************************/

export const getUserEntityState = createSelector(
  getAppState,
  (state: IAppState) => state[userEntityStateKey]
);

export const selectUserIds = createSelector(
  getUserEntityState,
  fromUserEntity.selectUserIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);
export const selectUserEntities = createSelector(
  getUserEntityState,
  fromUserEntity.selectUserEntities
);
export const selectAllUsers = createSelector(
  getUserEntityState,
  fromUserEntity.selectAllUsers
);
export const selectUserTotal = createSelector(
  getUserEntityState,
  fromUserEntity.selectUserTotal
);
export const selectCurrentUserId = createSelector(
  getUserEntityState,
  fromUserEntity.getSelectedUserId
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);
