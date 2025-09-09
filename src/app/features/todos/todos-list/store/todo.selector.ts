import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TODOS_FEATURE_KEY, TodosState } from "../../store/todo.reducer";

export const selectTodosState = createFeatureSelector<TodosState>(TODOS_FEATURE_KEY);

export const selectTodosStatus = createSelector(
  selectTodosState,
  (state) => state.status
);

export const selectTodosError = createSelector(
  selectTodosState,
  (state) => state.error
);

export const selectAllTodos = createSelector(
  selectTodosState,
  (state) => state.todos || []
);

export const selectTodoById = (id: number) =>
  createSelector(
    selectAllTodos,
    (todos) => todos.find(todo => todo.id === id) ?? null
  );