import { select, Store } from '@ngrx/store';
import * as TodosSelectors from './todo.selector';
import { CreateTodoDTO, TodoEntity } from '../interfaces/todo-interface';
import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import * as TodosActions from './todo.actions';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  private store = inject(Store);

  todos$: Observable<TodoEntity[]> = this.store.pipe(select(TodosSelectors.selectAllTodos));
  loading$ = this.store.pipe(select(TodosSelectors.selectTodosStatus), map(status => status === 'loading'));
  error$ = this.store.pipe(select(TodosSelectors.selectTodosError));

  init() {
    this.store.dispatch(TodosActions.LoadTodos());
  }

  addTodo(todoData: CreateTodoDTO) {
    this.store.dispatch(TodosActions.addTodo({ todoData }));
  }

  editTodo(id: number, todoData: CreateTodoDTO) {
    this.store.dispatch(TodosActions.editTodo({ id, todoData }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodosActions.deleteTodo({ id }));
  }
}