import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USERS } from '../app/constants/mock.const';
import { UserModel } from '../app/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class MockUserService {
  getUsers(): Observable<UserModel[]> {
    return of(MOCK_USERS);
  }

  addOrUpdateUser(user: UserModel): Observable<void> {
    const index = MOCK_USERS.findIndex(u => u.id === user.id);
    if (index !== -1) {
      MOCK_USERS[index] = user; // atualizar o usuário existente
    } else {
      MOCK_USERS.push(user); // adicionar um novo usuário
    }
    return of(); // simula uma operação bem-sucedida
  }

  deleteUser(userId: any): Observable<void> {
    const index = MOCK_USERS.findIndex(u => u.id === userId);
    if (index !== -1) {
      MOCK_USERS.splice(index, 1); // remove o usuário
    }
    return of(); // simula uma operação bem-sucedida
  }
}
