import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { Store } from "@ngrx/store";
import { selectAllTodos } from "../store/todo.selector";
import { TodoDTO, CreateTodoDTO } from "../interfaces/todo-interface";
import * as TodosActions from '../store/todo.actions';
import { TodosCardComponent } from "../todos-card/todos-card.component";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    TodosCardComponent,
    AsyncPipe,
    CreateTodoFormComponent,
    MatSnackBarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly snackBar = inject(MatSnackBar);
  public readonly todos$ = this.store.select(selectAllTodos);

  ngOnInit() {
    this.store.dispatch(TodosActions.LoadTodos());
  }  

  onDeleteTodo(id: number) {
    this.store.dispatch(TodosActions.deleteTodo({ id }));
  }

  onEditTodo(todoData: TodoDTO) {
    this.store.dispatch(TodosActions.editTodo({ todoData, id: todoData.id }));
  }

  onCreateTodo(formData: CreateTodoDTO) {
    const newTodo: CreateTodoDTO = {
      userId: formData.userId,
      title: formData.title,
      completed: formData.completed
    };
    this.store.dispatch(TodosActions.addTodo({ todoData: newTodo }));
    this.snackBar.open('Создание задачи инициировано', 'ОК', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}