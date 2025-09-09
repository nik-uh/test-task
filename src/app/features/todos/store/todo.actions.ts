import { createAction, props } from '@ngrx/store';
import { TodoEntity, CreateTodoDTO } from '../interfaces/todo-interface';

export const LoadTodos = createAction('[Todos Page] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todos/API] Load Todos Success',
  props<{ todos: TodoEntity[] }>()
);
export const loadTodosFailure = createAction(
  '[Todos/API] Load Todos Failure',
  props<{ error: unknown }>()
);

export const deleteTodo = createAction('[Todos Page] Delete Todo', props<{ id: number }>());
export const deleteTodoSuccess = createAction('[Todos/API] Delete Todo Success', props<{ id: number }>());
export const deleteTodoFailed = createAction('[Todos/API] Delete Todo Failed', props<{ error: unknown }>());

export const addTodo = createAction('[Todos Page] Add Todo', props<{ todoData: CreateTodoDTO }>());
export const addTodoSuccess = createAction('[Todos/API] Add Todo Success', props<{ todo: TodoEntity }>());
export const addTodoFailed = createAction('[Todos/API] Add Todo Failed', props<{ error: unknown }>());

export const editTodo = createAction('[Todos Detail] Edit Todo', props<{ todoData: CreateTodoDTO; id: number }>());
export const editTodoSuccess = createAction('[Todos Detail] Edit Todo Success', props<{ todo: TodoEntity }>());
export const editTodoFailed = createAction('[Todos Detail] Edit Todo Failed', props<{ error: unknown }>());