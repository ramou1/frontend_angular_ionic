import { Component, Injector, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { NbCardModule, NbIconModule, NbLayoutModule, NbMenuItem, NbMenuModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbThemeService } from '@nebular/theme';
import { BasePage } from '../services/base-page';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule,
    NbCardModule,
  ],
  providers: [NbSidebarService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent extends BasePage implements OnInit {
  title = 'Frontend Angular Ionic';
  public activatedTab = true;
  public user: any;

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
}
