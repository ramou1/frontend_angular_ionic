import { Component } from '@angular/core';
import { NbCardModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NbCardModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
