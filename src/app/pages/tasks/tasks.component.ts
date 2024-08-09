import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbCardModule, NbCheckboxModule, NbDialogModule, NbDialogService, NbIconModule, NbListModule, NbSelectModule, NbTagModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { BasePage } from '../../../services/base-page';
import { TaskModel } from '../../models/task-model';
import { CommonModule } from '@angular/common';
import { MSG_CONST } from '../../constants/message.const';
import { MOCK_TASKS, MOCK_USERS } from '../../constants/mock.const';
import { TASK_CATEGORIES } from '../../constants/data.const';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NbDialogModule, NbCardModule, NbIconModule, NbCheckboxModule, NbListModule, NbTagModule, NbSelectModule, NgxPaginationModule],
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
  public importedForm!: FormGroup;
  public editing: boolean = false;
  public choosedTask: any;
  public loading: boolean = false;
  public p: number = 1;
  public categories = TASK_CATEGORIES;

  columns = ['Título', 'Descrição', 'Data de Expiração', 'Data de Registro', 'Status', 'Responsável', 'Ações'];
  importColumn = ['title', 'description', 'expirationDate', 'registerDate', 'status', 'responsible'];

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    this.createForms();
    await this.getTasks();
  }

  createForms() {
    this.tasksForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: ['', Validators.required],
      status: ['', Validators.required],
      responsible: ['', Validators.required],
      registerDate: new Date(),
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
      console.log(this.tasks);
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

  public filterResponsibleList(evt?: any): void {
    const searchTerm = evt.target.value;

    if (searchTerm === '') {
      this.filteredTaskResponsibles = [];
    }
    else {
      this.filteredTaskResponsibles = this.taskResponsibles.filter((responsible: any) =>
        responsible.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 4);
    }
  }

  onTaskResponsibleChoose(user: UserModel): void {
    // user.isClicked = true;
    this.tasksForm.get('responsible')?.setValue([user]);
  }

  onResponsibleRemove(task: any): void {
    this.toastrSrvc.danger(null, MSG_CONST.NOT_AVAILABLE, { icon: '' });
  }

  getResponsibleTitle(responsible: UserModel): any {
    // switch (group) {
    //   case 'protein': return 'Proteína';
    //   case 'carbo': return 'Carboidrato';
    //   case 'fruit': return 'Fruta';
    //   case 'fat': return 'Gordura';
    //   case 'salad': return 'Salada';
    //   default: return 'Outros'
    // }

    const title = this.taskResponsibles.filter((user: any) => user.id === responsible.id)[0]?.title;
    return title || '';
  }

  getStatusName(type: string): string {
    switch (type) {
      case 'teste01': return 'Teste 1';
      case 'teste02': return 'Teste 2';;
      default: return 'Outros'
    }
  }

  openTaskDialog(dialog: TemplateRef<any>, task?: TaskModel) {
    this.editing = false;
    this.choosedTask = null;
    this.filteredTaskResponsibles = [];
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
