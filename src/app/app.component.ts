import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbIconModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
  ],
  providers: [NbSidebarService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-angular-ionic-test';
}
