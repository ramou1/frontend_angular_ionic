import { Component, Injector, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { NbCardModule, NbIconModule, NbLayoutModule, NbMenuItem, NbMenuModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbThemeService } from '@nebular/theme';
import { BasePage } from '../services/base-page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
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
      icon: 'clipboard-outline',
      link: '/tasks',
      pathMatch: 'full',
    },
    {
      title: 'Usuários',
      icon: 'person-add-outline',
      link: '/users',
      pathMatch: 'full',
      // badge: {
      //   text: '30',
      //   status: 'primary',
      // },
    },
  ];

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    // configuração dos ícones
    this.iconLibraries.registerFontPack('eva', { packClass: 'eva', iconClassPrefix: 'eva' });
    this.iconLibraries.setDefaultPack('eva');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let child = this.activatedRoute.firstChild;
        if (!child) {
          return;
        }
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data) {
          this.activatedTab = child.snapshot.data['tab'];
        }
      }
    });
  }
}
