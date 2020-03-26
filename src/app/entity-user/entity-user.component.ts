import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject, pipe } from 'rxjs';

import IUser from '../store/users/users.model';
import * as UsersActions from '../store/users/users.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { IAppState } from './../store/index';
import * as fromStore from './../store';
import { takeUntil, map } from 'rxjs/operators';
@Component({
  selector: 'app-entity-user',
  templateUrl: './entity-user.component.html',
  styleUrls: ['./entity-user.component.scss']
})
export class EntityUserComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]> = null;
  appState$: Observable<IAppState>;
  userForm: FormGroup;
  selectedUser$: Observable<IUser>;
  errorMsg = null;
  totalUsers$: Observable<number> = null;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.users$ = this.store.pipe(
      pipe(
        select(fromStore.selectAllUsers),
        map(users =>
          users.filter(user => {
            return user.first_name !== '';
          })
        )
      )
    );

    this.store
      .pipe(pipe(select(fromStore.selectCurrentUser)))
      .subscribe(user => {
        console.log(user);
      });

    this.store.dispatch(UsersActions.BeginGetUsersAction());

    this.userForm = new FormGroup({
      name: new FormControl(''),
      job: new FormControl('')
    });
  }

  getUser(id: number): void {
    this.store.dispatch(UsersActions.GetCurrentUser({ id }));
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

  ngOnDestroy() {}
}
