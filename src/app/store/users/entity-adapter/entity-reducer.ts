import IUser from '../users.model';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UsersActions from '../users.actions';

export interface IEntityUserState extends EntityState<IUser> {
  // additional entities state properties
  selectedUserId: number;
}

export function selectUserId(a: IUser): number {
  // In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: IUser, b: IUser): number {
  return a.first_name.localeCompare(b.first_name);
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: selectUserId,
  sortComparer: sortByName
});

export const initialState: IEntityUserState = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null
});

const userReducer = createReducer(
  initialState,
  on(UsersActions.BeginGetUsersAction, state => state),
  on(UsersActions.GetCurrentUser, (state, { id }) => {
    return {
      ...state,
      selectedUserId: id
    };
  }),
  on(UsersActions.SuccessGetUsersAction, (state, { users }) => {
    return adapter.setAll(users, state);
  }),
  on(UsersActions.SuccessCreateUserAction, (state, { user }) => {
    return adapter.setOne(user, state);
  }),
  on(UsersActions.DeleteUserAction, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),

  on(UsersActions.ErrorUserAction, (state: IEntityUserState, error: Error) => {
    return { ...state, userError: error };
  })
);

export function entityReducer(
  state: IEntityUserState | undefined,
  action: Action
) {
  return userReducer(state, action);
}

export const getSelectedUserId = (state: IEntityUserState) =>
  state.selectedUserId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
