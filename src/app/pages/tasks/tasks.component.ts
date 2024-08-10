import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButton, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbTagModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { BasePage } from '../../../services/base-page';
import { TaskModel } from '../../models/task-model';
import { CommonModule } from '@angular/common';
import { MSG_CONST } from '../../constants/message.const';
import { MOCK_USERS } from '../../constants/mock.const';
import { MockTaskService } from '../../../services/mock-task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NbFormFieldModule, NbInputModule, NbDatepickerModule, NbDialogModule, NbCardModule, NbButtonModule, NbIconModule, NbCheckboxModule, NbListModule, NbMenuModule, NbTagModule, NbSelectModule, NbSidebarModule, NgxPaginationModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  providers: [NbDialogService],
})

export class TasksComponent extends BasePage implements OnInit {

  selectedSort: any = null;
  selectedStatusFilter: any = null;
  selectedResponsible: any = null;
  filteredTaskResponsibles: any[] = [];
  public taskResponsibles: any[] = [];
  public tasks: TaskModel[] = [];
  public filteredTasks: any;
  public tasksForm!: FormGroup;
  public editing: boolean = false;
  public choosedTask: any;
  public loading: boolean = false;
  public p: number = 1;
  public minDate: Date | undefined;
  public sort: string[] = ['', ''];

  columns = ['Título', 'Descrição', 'Data de Registro', 'Data de Vencimento', 'Status', 'Responsável', 'Ações'];
  importColumn = ['title', 'description', 'registerDate', 'expirationDate', 'status', 'responsible'];

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    this.createForms();
    await this.getTasks();
    await this.getTaskResponsibles();
  }

  createForms() {
    this.tasksForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: ['', Validators.required],
      status: ['', Validators.required],
      responsible: [''],
      responsibleId: [''],
      registerDate: null,
    });

    this.minDate = new Date();
  }

  getTasks() {
    this.taskSrvc.getTasks().subscribe({
      next: (tasks: TaskModel[]) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
      },
      error: (err: any) => console.error(err),
    });
  }

  public async getTaskResponsibles(): Promise<void> {
    try {
      this.taskResponsibles = MOCK_USERS;
    } catch (e) {
      console.error(e);
    }
  }

  // método de pesquisa das tarefas
  public searchTasks(evt: any): void {
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const searchTerm = removeAccents(evt.target.value);

    if (searchTerm === '') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter((data: any) => {
        const titleWithoutAccents = removeAccents(data.title.toLowerCase());
        return titleWithoutAccents.indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  // método de filtragem dos responsáveis pela tarefa
  public filterResponsibles(): void {
    if (this.selectedResponsible === null) {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter((task: any) => task.responsibleId === this.selectedResponsible);
    }
  }

  // método de ordenação das tarefas
  public sortTasks(): void {
    if (this.selectedSort === 0) {
      // ordenar por Data de Vencimento: Crescente
      this.filteredTasks.sort((a: any, b: any) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
    } else if (this.selectedSort === 1) {
      // ordenar por Data de Vencimento: Decrescente
      this.filteredTasks.sort((a: any, b: any) => new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime());
    }
  }

  // método de filtragem das tarefas
  public filterTasks(): void {
    if (this.selectedStatusFilter === null) {
      this.filteredTasks = this.tasks;
    } else if (this.selectedStatusFilter === 0) {
      // filtrar por Status: Pendente
      this.filteredTasks = this.tasks.filter((task: any) => task.status === 0);
    } else if (this.selectedStatusFilter === 1) {
      // filtrar por Status: Em andamento
      this.filteredTasks = this.tasks.filter((task: any) => task.status === 1);
    } else if (this.selectedStatusFilter === 2) {
      // filtrar por Status: Concluída
      this.filteredTasks = this.tasks.filter((task: any) => task.status === 2);
    }
  }

  // método de formatação do status da tarefa
  getStatusName(status: number): string {
    switch (status) {
      case 0: return 'Pendente';
      case 1: return 'Em andamento';
      case 2: return 'Concluída';
      default: return 'Não iniciado'
    }
  }

  getStatusColor(status: number): string {
    switch (status) {
      case 0: return 'warning';
      case 1: return 'info';
      case 2: return 'success';
      default: return 'basic'
    }
  }

  // método de abertura do diálogo de tarefas
  openTaskDialog(dialog: TemplateRef<any>, task?: TaskModel) {
    this.editing = false;
    this.choosedTask = null;
    this.dialogSrvc.open(dialog);
    this.tasksForm.reset();

    if (task) {
      this.editing = true;
      this.choosedTask = task;
      this.tasksForm.patchValue(task);
    }
  }

  async deleteTask(taskId: any) {
    try {
      await this.taskSrvc.deleteTask(taskId).toPromise();
      this.filteredTasks = this.filteredTasks.filter((task: TaskModel) => task.id !== taskId);
      await this.toastrSrvc.success(null, MSG_CONST.DELETED_TASK_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.DELETED_TASK_ERROR, { icon: '' });
      console.error(e);
    }
  }

  // método de adição ou atualização de tarefas
  async addOrUpdateTask() {
    try {
      const formData = this.tasksForm.value;
      formData.registerDate = new Date();
      formData.responsible = this.taskResponsibles.find((responsible: any) => responsible.id === formData.responsibleId);
      await this.taskSrvc.addOrUpdateTask(formData).toPromise();
      await this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
      await this.getTasks();
      this.tasksForm.reset();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }
}