import { CommonModule } from '@angular/common';
import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
  NbTagModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { firstValueFrom } from 'rxjs';
import { BasePage } from '../../../services/base-page';
import { MSG_CONST } from '../../constants/message.const';
import { getStatusColor, getStatusName, normalizeText, TASK_STATUS } from '../../constants/task-status';
import { TaskModel } from '../../models/task-model';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbDatepickerModule,
    NbDialogModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
    NbTagModule,
    NbSelectModule,
    NgxPaginationModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent extends BasePage implements OnInit {
  selectedSort: number | null = null;
  selectedStatusFilter: number | null = null;
  selectedResponsible: string | null = null;
  searchTerm = '';
  taskResponsibles: UserModel[] = [];
  filteredTasks: TaskModel[] = [];
  tasksForm!: FormGroup;
  editing = false;
  choosedTask: TaskModel | null = null;
  p = 1;
  minDate: Date = new Date();

  constructor(public injector: Injector) {
    super(injector);

    effect(() => {
      this.taskSrvc.tasks();
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.createForms();
    this.taskResponsibles = this.userSrvc.users();
    this.applyFilters();
  }

  createForms(): void {
    this.tasksForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: ['', Validators.required],
      progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      status: [TASK_STATUS.PENDING, Validators.required],
      responsibleId: ['', Validators.required],
      registerDate: [null],
    });
  }

  searchTasks(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.p = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let list = [...this.taskSrvc.tasks()];

    if (this.searchTerm.trim()) {
      const term = normalizeText(this.searchTerm);
      list = list.filter((task) => normalizeText(task.title || '').includes(term));
    }

    if (this.selectedResponsible) {
      list = list.filter((task) => task.responsibleId === this.selectedResponsible);
    }

    if (this.selectedStatusFilter !== null) {
      list = list.filter((task) => task.status === this.selectedStatusFilter);
    }

    if (this.selectedSort === 0) {
      list.sort((a, b) => new Date(a.expirationDate || 0).getTime() - new Date(b.expirationDate || 0).getTime());
    } else if (this.selectedSort === 1) {
      list.sort((a, b) => new Date(b.expirationDate || 0).getTime() - new Date(a.expirationDate || 0).getTime());
    }

    this.filteredTasks = list;
  }

  getStatusName = getStatusName;
  getStatusColor = getStatusColor;

  isOverdue(task: TaskModel): boolean {
    if (task.status === TASK_STATUS.DONE || !task.expirationDate) {
      return false;
    }

    const limit = new Date(task.expirationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return limit < today;
  }

  openTaskView(dialog: TemplateRef<unknown>, task: TaskModel): void {
    this.choosedTask = task;
    this.dialogSrvc.open(dialog);
  }

  openTaskDialog(dialog: TemplateRef<unknown>, task?: TaskModel | null): void {
    this.editing = !!task;
    this.choosedTask = task || null;
    this.tasksForm.reset({
      progress: 0,
      status: TASK_STATUS.PENDING,
    });

    if (task) {
      this.tasksForm.patchValue({
        ...task,
        expirationDate: task.expirationDate ? new Date(task.expirationDate) : null,
      });
    }

    this.dialogSrvc.open(dialog);
  }

  openDeleteDialog(dialog: TemplateRef<unknown>, task: TaskModel): void {
    this.choosedTask = task;
    this.dialogSrvc.open(dialog);
  }

  async deleteTask(): Promise<void> {
    if (!this.choosedTask?.id) {
      return;
    }

    try {
      await firstValueFrom(this.taskSrvc.deleteTask(this.choosedTask.id));
      this.toastrSrvc.success(MSG_CONST.DELETED_TASK_OK, 'Pronto');
      this.choosedTask = null;
    } catch (error) {
      this.toastrSrvc.danger(MSG_CONST.DELETED_TASK_ERROR, 'Erro');
      console.error(error);
    }
  }

  async addOrUpdateTask(): Promise<void> {
    if (this.tasksForm.invalid) {
      this.tasksForm.markAllAsTouched();
      return;
    }

    try {
      const formData = this.tasksForm.getRawValue() as TaskModel;
      if (this.editing) {
        formData.registerDate = this.choosedTask?.registerDate;
      }
      await firstValueFrom(this.taskSrvc.addOrUpdateTask(formData));
      this.toastrSrvc.success(MSG_CONST.SAVE_DATA_OK, 'Pronto');
      this.tasksForm.reset();
    } catch (error) {
      this.toastrSrvc.danger(MSG_CONST.SAVE_DATA_ERROR, 'Erro');
      console.error(error);
    }
  }
}
