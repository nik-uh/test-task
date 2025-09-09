import { Routes } from '@angular/router';
import { TodosListComponent } from './features/todos/todos-list/todos-list.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './features/user/user.component';
import { TaskDetailsComponent } from './features/todos/task-details/task-details.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'tasks', component: TodosListComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent }
];
