import { Component, Injector, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbCardModule, NbIconModule, NbLayoutModule, NbMenuItem, NbMenuModule, NbSidebarModule, NbSidebarService, NbContextMenuModule, NbUserModule, NbActionsModule, NbPosition } from '@nebular/theme';
import { BasePage } from '../services/base-page';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NbActionsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule,
    NbCardModule,
    NbContextMenuModule,
    NbUserModule,  
  ],
  providers: [NbSidebarService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent extends BasePage implements OnInit {
  title = 'TaskTrack Angular';
  public activatedTab = true;
  
  // Simulação de dados do usuário
  public user = {
    name: 'Ramon Oliveira',
    avatar: 'assets/images/user-avatar.jpg',
  };

  // Itens do menu de contexto
  public contextMenuItems = [
    { title: 'Profile', icon: 'person-outline', link: '/profile' },
    { title: 'Logout', icon: 'log-out-outline', link: '/logout' },
  ];

  public position = NbPosition.RIGHT;

  public menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/dashboard',
      pathMatch: 'full',
    },
    {
      title: 'Tarefas',
      icon: 'calendar-outline',
      link: '/tasks',
      pathMatch: 'full',
    },
    {
      title: 'Usuários',
      icon: 'person-add-outline',
      link: '/users',
      pathMatch: 'full',
    },
  ];

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() { }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }
}
