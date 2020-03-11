import { createAction, props } from '@ngrx/store';

import IUser from './users.model';

export const GetUserAction = createAction(
  '[User] - Get User',
  props<{ id: number }>()
);

export const GetCurrentUser = createAction(
  '[User Entity] - Get Selected User',
  props<{ id: number }>()
);
export const SuccessGetUserAction = createAction(
  '[User] - Success Get User',
  props<{ user: IUser }>()
);

export const DeleteUserAction = createAction(
  '[User] - Delete User',
  props<{ id: number }>()
);
export const SuccessDeleteUserAction = createAction(
  '[User] - Success Delete User',
  props<{ isDeleted: boolean }>()
);

export const BeginGetUsersAction = createAction('[User] - Begin Get Users');
export const SuccessGetUsersAction = createAction(
  '[User] - Success Get Users',
  props<{ users: IUser[] }>()
);

export const CreateUserAction = createAction(
  '[User] - Create User',
  props<{ name: string; job: string }>()
);
export const SuccessCreateUserAction = createAction(
  '[User] - Success Create User',
  props<{ user: IUser }>()
);

export const ErrorUserAction = createAction('[User] - Error', props<Error>());
