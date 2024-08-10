import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButton, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbDialogService, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbTagModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { BasePage } from '../../../services/base-page';
import { TaskModel } from '../../models/task-model';
import { CommonModule } from '@angular/common';
import { MSG_CONST } from '../../constants/message.const';
import { MOCK_TASKS, MOCK_USERS } from '../../constants/mock.const';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NbInputModule, NbDatepickerModule, NbDialogModule, NbCardModule, NbButtonModule, NbIconModule, NbCheckboxModule, NbListModule, NbMenuModule, NbTagModule, NbSelectModule, NbSidebarModule, NgxPaginationModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  providers: [NbDialogService],
})

export class TasksComponent extends BasePage implements OnInit {

  filteredTaskResponsibles: any[] = [];
  public taskResponsibles: any[] = [];
  public tasks: any;
  public filteredTasks: any;
  public tasksForm!: FormGroup;
  public editing: boolean = false;
  public choosedTask: any;
  public loading: boolean = false;
  public p: number = 1;

  columns = ['Título', 'Descrição', 'Data de Expiração', 'Data de Registro', 'Status', 'Responsável', 'Ações'];
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
  }

  public async getTasks(): Promise<void> {
    try {
      // const params: Params = {
      //   orders: [
      //     {
      //       direction: 'asc',
      //       fieldPath: 'title'
      //     }
      //   ],
      // };
      // const res = await this.tasksSrvc.getIngredients(params);
      // this.tasks = res;
      this.tasks = MOCK_TASKS;
      this.filteredTasks = this.tasks;
    } catch (e) {
      console.error(e);
    }
  }

  public async getTaskResponsibles(): Promise<void> {
    try {
      // this.taskResponsibles = await this.taskResponsiblesSrvc.load();
      this.taskResponsibles = MOCK_USERS;
    } catch (e) {
      console.error(e);
    }
  }

  public filterTasks(evt: any): void {
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

  openTaskDialog(dialog: TemplateRef<any>, task?: TaskModel) {
    this.editing = false;
    this.choosedTask = null;
    this.dialogSrvc.open(dialog);
    this.tasksForm.reset();

    if (task) {
      console.log(task);
      this.editing = true;
      this.choosedTask = task;
      this.tasksForm.patchValue(task);
    }
  }

  async deleteTask(taskId: any) {
    try {
      // await this.tasksSrvc.deleteIngredient(taskId);
      // await this.getTasks();
      await this.toastrSrvc.success(null, MSG_CONST.DELETED_INGREDIENT_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.DELETED_INGREDIENT_ERROR, { icon: '' });
      console.error(e);
    }
  }

  async addOrUpdateTask() {
    try {
      const formData = this.tasksForm.value;
      formData.registerDate = new Date();
      formData.responsible = this.taskResponsibles.find((responsible: any) => responsible.id === formData.responsibleId);
      console.log(formData);
      // await this.tasksSrvc.addOrUpdateIngredients(formData);
      await this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
      await this.getTasks();
      this.tasksForm.reset();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }
}
