import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { selectTodoById } from '../store/todo.selector';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf, MatButtonModule, RouterLink],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  readonly todo$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get('id'));
      return this.store.pipe(select(selectTodoById(id)));
    })
  );
}


