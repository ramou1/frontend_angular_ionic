import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbFormFieldModule, NbInputModule, NbDatepickerModule, NbDialogModule, NbCardModule, NbButtonModule, NbIconModule, NbCheckboxModule, NbListModule, NbMenuModule, NbTagModule, NbSelectModule, NbSidebarModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { BasePage } from '../../../services/base-page';
import { MSG_CONST } from '../../constants/message.const';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NbFormFieldModule, NbInputModule, NbDatepickerModule, NbDialogModule, NbCardModule, NbButtonModule, NbIconModule, NbCheckboxModule, NbListModule, NbMenuModule, NbTagModule, NbSelectModule, NbSidebarModule, NgxPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends BasePage implements OnInit {

  selectedSort: any = null;
  filteredUserResponsibles: any[] = [];
  public users: UserModel[] = [];
  public filteredUsers: any;
  public usersForm!: FormGroup;
  public editing: boolean = false;
  public choosedUser: any;
  public loading: boolean = false;
  public p: number = 1;
  public minDate: Date | undefined;
  public sort: string[] = ['', ''];

  columns = ['ID', 'Nome', 'Data de Cadastro', 'E-mail', 'Gênero', 'Nível', 'Ações'];
  importColumn = ['id', 'name', 'registerDate', 'email', 'gender', 'role'];

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    this.createForms();
    await this.getUsers();
  }

  createForms() {
    this.usersForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      registerDate: null,
    });

    this.minDate = new Date();
  }

  getUsers() {
    this.userSrvc.getUsers().subscribe({
      next: (users: UserModel[]) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: (err: any) => console.error(err),
    });
  }

  // método de pesquisa das usuários
  public searchUsers(evt: any): void {
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const searchTerm = removeAccents(evt.target.value);

    if (searchTerm === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((data: any) => {
        const titleWithoutAccents = removeAccents(data.name.toLowerCase());
        return titleWithoutAccents.indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  // método de ordenação das usuários
  public sortUsers(): void {
    if (this.selectedSort === 0) {
      // ordenar por Cadastro Crescente
      this.filteredUsers.sort((a: any, b: any) => new Date(a.registerDate).getTime() - new Date(b.registerDate).getTime());
    } else if (this.selectedSort === 1) {
      // ordenar por Cadastro Decrescente
      this.filteredUsers.sort((a: any, b: any) => new Date(b.registerDate).getTime() - new Date(a.registerDate).getTime());
    }
  }

  // tradução do nível do usuário
  getRoleName(role: string): string {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'user': return 'Usuário';
      default: return 'Desconhecido';
    }
  }

  getStatusColor(role: string): string {
    switch (role) {
      case 'admin': return 'info';
      case 'user': return 'success';
      default: return 'basic'
    }
  }

  // método de abertura do modal de usuários
  openUserDialog(dialog: TemplateRef<any>, user?: UserModel) {
    this.editing = false;
    this.choosedUser = null;
    this.dialogSrvc.open(dialog);
    this.usersForm.reset();

    if (user) {
      this.editing = true;
      this.choosedUser = user;
      this.usersForm.patchValue(user);
    }
  }

  async deleteUser(userId: any) {
    try {
      await this.userSrvc.deleteUser(userId).toPromise();
      this.filteredUsers = this.filteredUsers.filter((user: UserModel) => user.id !== userId);
      await this.toastrSrvc.success(null, MSG_CONST.DELETED_USER_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.DELETED_USER_ERROR, { icon: '' });
      console.error(e);
    }
  }

  // método de adição ou atualização de usuários
  async addOrUpdateUser() {
    try {
      const formData = this.usersForm.value;
      formData.registerDate = new Date();
      await this.userSrvc.addOrUpdateUser(formData).toPromise();
      await this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
      await this.getUsers();
      this.usersForm.reset();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }
}