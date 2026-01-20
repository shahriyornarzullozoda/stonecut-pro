import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProjectComponent } from './pages/project/project.component';

export const routes: Routes = [
     {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ProjectComponent }
    ]
  }
];
