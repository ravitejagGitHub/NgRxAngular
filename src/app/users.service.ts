import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import IUser from './store/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<IUser[]>('https://reqres.in/api/users')
      .pipe(pluck('data'));
  }

  getUser(id: number): Observable<IUser> {
    return this.http
      .get<IUser>(`https://reqres.in/api/users/${id}`)
      .pipe(pluck('data'));
  }

  create(user: any): Observable<IUser> {
    return this.http.put<IUser>(`https://reqres.in/api/users`, user).pipe(
      map((resp: any) => {
        const userObj: IUser = {
          id: Math.floor(Math.random() * (100000 - 10) + 10),
          email: 'raviteja@gmail.com',
          first_name: resp.name,
          last_name: resp.name,
          avatar: 'string'
        };
        return userObj;
      }),
      catchError(error =>
        throwError('Something bad happened; please try again later.' + error)
      )
    );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http
      .delete(`https://reqres.in/api/users/${id}`, {
        observe: 'response'
      })
      .pipe(
        map(resp => {
          return resp.status === 204  ? true : false;
        })
      );
  }
}
