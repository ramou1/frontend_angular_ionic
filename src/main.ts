import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NbThemeModule, NbDialogModule, NbToastrModule, NbIconModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { provideRouter } from '@angular/router';
import { importProvidersFrom, inject } from '@angular/core';
import { routes } from './app/app.routes';
import 'eva-icons';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'cosmic' }),
      NbDialogModule.forRoot(),
      NbIconModule,
      NbSidebarModule,
      NbMenuModule.forRoot(),
      NbToastrModule.forRoot(),
    )
  ],
}).catch(err => console.error(err));