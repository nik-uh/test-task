import { createReducer, on, Action } from '@ngrx/store';
import * as TodosActions from './todo.actions';
import { TodoEntity } from '../interfaces/todo-interface';

export const TODOS_FEATURE_KEY = 'todos';

export interface TodosState {
  todos: TodoEntity[];
  status: 'init' | 'loading' | 'error' | 'loaded';
  error: unknown | null;
}

export const initialTodosState: TodosState = {
  todos: [],
  status: 'init',
  error: null,
};

export const todosReducer = createReducer(
  initialTodosState,

  on(TodosActions.LoadTodos, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),

  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    status: 'loaded' as const,
    error: null,
  })),

  on(TodosActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(TodosActions.addTodo, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),

  on(TodosActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    status: 'loaded' as const,
    error: null,
  })),

  on(TodosActions.addTodoFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(TodosActions.editTodo, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),

  on(TodosActions.editTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t),
    status: 'loaded' as const,
    error: null,
  })),

  on(TodosActions.editTodoFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(TodosActions.deleteTodo, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),

  on(TodosActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id),
    status: 'loaded' as const,
    error: null,
  })),

  on(TodosActions.deleteTodoFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);

export function reducer(state: TodosState | undefined, action: Action) {
  return todosReducer(state, action);
}