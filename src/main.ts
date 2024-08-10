import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NbThemeModule, NbDialogModule, NbToastrModule, NbIconModule, NbSidebarModule, NbMenuModule, NbDatepickerModule } from '@nebular/theme';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'eva-icons';
import { NbDateFnsDateModule } from '@nebular/date-fns';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      NbThemeModule.forRoot({ name: 'cosmic' }),
      NbDatepickerModule.forRoot(),
      NbDateFnsDateModule,
      NbDialogModule.forRoot(),
      NbIconModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbToastrModule.forRoot(),
    )
  ],
}).catch(err => console.error(err));