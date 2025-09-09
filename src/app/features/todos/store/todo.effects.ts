import { Injectable, inject } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as TodosActions from './todo.actions';
import { TodosApiService } from '../../../core/services/todos-api.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private api = inject(TodosApiService);
  private snackBar = inject(MatSnackBar);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.LoadTodos),
      tap(() => console.log('LoadTodos action dispatched')),
      mergeMap(() =>
        this.api.getTodos().pipe(
          tap(todos => console.log('LoadTodos API response:', todos)),
          map(todos => TodosActions.loadTodosSuccess({ todos })),
          catchError(error => {
            console.error('LoadTodos API error:', error);
            return of(TodosActions.loadTodosFailure({ error }));
          })
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodo),
      tap(({ todoData }) => console.log('addTodo action dispatched with:', todoData)),
      mergeMap(({ todoData }) =>
        this.api.addTodo(todoData).pipe(
          tap(todo => console.log('addTodo API response:', todo)),
          map(todo => TodosActions.addTodoSuccess({ todo })),
          tap(() => {
            this.snackBar.open('Задача создана', 'ОК', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }),
          catchError(error => {
            console.error('addTodo API error:', error);
            return of(TodosActions.addTodoFailed({ error }));
          })
        )
      )
    )
  );

  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.editTodo),
      tap(({ id, todoData }) => console.log('editTodo action dispatched with:', { id, todoData })),
      mergeMap(({ id, todoData }) =>
        this.api.updateTodo(id, todoData).pipe(
          tap(todo => console.log('editTodo API response:', todo)),
          map(todo => TodosActions.editTodoSuccess({ todo })),
          catchError(error => {
            console.error('editTodo API error:', error);
            return of(TodosActions.editTodoFailed({ error }));
          })
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteTodo),
      tap(({ id }) => console.log('deleteTodo action dispatched with id:', id)),
      mergeMap(({ id }) =>
        this.api.deleteTodo(id).pipe(
          tap(() => console.log('deleteTodo API success')),
          map(() => TodosActions.deleteTodoSuccess({ id })),
          tap(() => {
            this.snackBar.open('Задача удалена', 'ОК', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }),
          catchError(error => {
            console.error('deleteTodo API error:', error);
            return of(TodosActions.deleteTodoFailed({ error }));
          })
        )
      )
    )
  );
}