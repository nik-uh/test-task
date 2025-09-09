import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { TodoCutPipe } from "../pipes/todo.pipe";
import { TodoDTO } from "../interfaces/todo-interface";
import { EditTodoDialogComponent } from "../edit-todo/edit-todo-dialog.component";



@Component({
  selector: 'app-todo-card',
  templateUrl: './todos-card.component.html',
  styleUrls: ['./todos-card.component.scss'],
  standalone: true,
  imports: [TodoCutPipe, MatButtonModule, MatIconModule]
})
export class TodosCardComponent {
  @Input()
  todo!: TodoDTO;

  @Output()
  deleteTodo = new EventEmitter();

  @Output()
  editTodo = new EventEmitter();

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      if (editResult) {
        this.editTodo.emit(editResult);
        this.snackBar.open('Задача отредактирована', 'Закрыть', {
          duration: 2000
        });
      } else {
        this.snackBar.open('Отмена редактирования', '', {
          duration: 2000
        });
      }
    });
  }

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }

  goToDetails(id: number) {
    this.router.navigate(['/tasks', id]);
  }
}
