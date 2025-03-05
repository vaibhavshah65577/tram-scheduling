import { Routes } from '@angular/router';
import { TramScheduleComponent } from './components/tram-schedule/tram-schedule.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tram-schedule',
    pathMatch: 'full',
  },
  {
    path: 'tram-schedule',
    component: TramScheduleComponent,
  },
];
