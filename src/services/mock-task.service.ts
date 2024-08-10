import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskModel } from '../app/models/task-model';
import { MOCK_TASKS } from '../app/constants/mock.const';

@Injectable({
  providedIn: 'root',
})
export class MockTaskService {
  getTasks(): Observable<TaskModel[]> {
    return of(MOCK_TASKS);
  }

  addOrUpdateTask(task: TaskModel): Observable<void> {
    const index = MOCK_TASKS.findIndex(t => t.id === task.id);
    if (index !== -1) {
      MOCK_TASKS[index] = task; // atualizar a tarefa existente
    } else {
      MOCK_TASKS.push(task); // adicionar uma nova tarefa
    }
    return of(); // simula uma operação bem-sucedida
  }

  deleteTask(taskId: any): Observable<void> {
    const index = MOCK_TASKS.findIndex(t => t.id === taskId);
    if (index !== -1) {
      MOCK_TASKS.splice(index, 1); // remove a tarefa
    }
    return of(); // simula uma operação bem-sucedida
  }
}
