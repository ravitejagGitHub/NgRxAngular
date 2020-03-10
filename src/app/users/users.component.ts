import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import IUserState from '../store/users/users.state';
import { Observable, Subscription, Subject } from 'rxjs';

import IUser from '../store/users/users.model';
import * as UsersActions from '../store/users/users.actions';
import { FormGroup, FormControl } from '@angular/forms';
import {
  selectUsers,
  totalUsers,
  selectSelectedUser,
  selectUserError
} from '../store/users';
import {
  selectUserStateUsers,
  IAppState,
  userStateKey
} from './../store/index';
import * as fromStore from './../store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  User: string = '';
  users: IUser[] = [];
  users$: Observable<IUser[]> = null;
  userState$: Observable<IUserState>;
  usersSubscription: Subscription[];
  userForm: FormGroup;
  selectedUser: IUser = null;
  errorMsg = null;
  totalUsers = 0;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<IAppState>) {
    this.userState$ = this.store.select(userStateKey);
  }

  ngOnInit(): void {
    // this.userState$.pipe(select(selectUsers))
    // .pipe(takeUntil(this.destroyed$)).subscribe(
    //   (users: IUser[]) => {
    //     this.users = users;
    //   }
    // );

    this.users$ = this.store
      .select(fromStore.selectUserStateUsers);

    this.userState$
      .pipe(select(totalUsers))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((usersCount: number) => {
        this.totalUsers = usersCount;
      });

    this.userState$
      .pipe(select(selectSelectedUser))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((selectedUser: IUser) => {
        this.selectedUser = selectedUser;
      });

    this.userState$
      .pipe(select(selectUserError))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error: Error) => {
        this.errorMsg = error?.message;
      });
    // this.usersSubscription = this.userState$.pipe(select(selectUsers)).subscribe(
    //   (users: IUsers[]) => {
    //     this.users = users;
    //     this.selectedUser = appState.selectedUser;
    //     this.errorMsg = appState.userError?.message;
    //   }
    // );
    this.store.dispatch(UsersActions.BeginGetUsersAction());

    this.userForm = new FormGroup({
      name: new FormControl(''),
      job: new FormControl('')
    });
  }

  getUser(id: number): void {
    this.store.dispatch(UsersActions.GetUserAction({ id }));
  }

  createuser(): void {
    const user = {
      name: this.userForm.get('name').value,
      job: this.userForm.get('job').value
    };
    this.store.dispatch(UsersActions.CreateUserAction(user));
  }

  deleteUser(id: number): void {
    this.store.dispatch(UsersActions.DeleteUserAction({ id }));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
