import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { appRoutes } from './app.routes';
import { todosReducer } from './features/todos/store/todo.reducer';
import { TODOS_FEATURE_KEY } from './features/todos/store/todo.reducer';
import { TodosEffects } from './features/todos/store/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideEffects(TodosEffects),
    provideAnimationsAsync('noop'),
    provideStore({
      [TODOS_FEATURE_KEY]: todosReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ]
};
