import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USERS } from '../app/constants/mock.const';
import { UserModel } from '../app/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class MockUserService {
  private readonly usersState = signal<UserModel[]>(MOCK_USERS.map((user) => ({ ...user })));
  readonly users = this.usersState.asReadonly();

  getUsers(): Observable<UserModel[]> {
    return of(this.usersState());
  }

  addOrUpdateUser(user: UserModel): Observable<UserModel> {
    const payload: UserModel = {
      ...user,
      id: user.id || Date.now().toString(),
      registerDate: user.registerDate || new Date(),
    };

    this.usersState.update((list) => {
      const index = list.findIndex((item) => item.id === payload.id);
      if (index === -1) {
        return [payload, ...list];
      }

      const next = [...list];
      next[index] = payload;
      return next;
    });

    return of(payload);
  }

  deleteUser(userId: string): Observable<void> {
    this.usersState.update((list) => list.filter((user) => user.id !== userId));
    return of(undefined);
  }
}
