import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as UsersActions from './users.actions';
import IUser from './users.model';
import { UsersService } from '../../users.service';

@Injectable()
export class UsersEffects {
  constructor(private action$: Actions, private userService: UsersService) {}

  GetUsers$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.BeginGetUsersAction),
      mergeMap(action =>
        this.userService.getAll().pipe(
          map((users: IUser[]) => {
            return UsersActions.SuccessGetUsersAction({ users });
          }),
          catchError((error: Error) => {
            return of(UsersActions.ErrorUserAction(error));
          })
        )
      )
    )
  );

  GetUser$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.GetUserAction),
      mergeMap(action =>
        this.userService.getUser(action.id).pipe(
          map((user: IUser) => {
            return UsersActions.SuccessGetUserAction({ user });
          }),
          catchError((error: Error) => {
            return of(UsersActions.ErrorUserAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.CreateUserAction),
      mergeMap(action =>
        this.userService.create({ name: action.name, job: action.job }).pipe(
          map((user: IUser) => {
            return UsersActions.SuccessCreateUserAction({ user });
          }),
          catchError((error: Error) => {
            return of(UsersActions.ErrorUserAction(error));
          })
        )
      )
    )
  );

  DeleteUser$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.DeleteUserAction),
      mergeMap(action =>
        this.userService.deleteUser(action.id).pipe(
          map((isDeleted: boolean) => {
            return UsersActions.SuccessDeleteUserAction({ isDeleted });
          }),
          catchError((error: Error) => {
            return of(UsersActions.ErrorUserAction(error));
          })
        )
      )
    )
  );
}
