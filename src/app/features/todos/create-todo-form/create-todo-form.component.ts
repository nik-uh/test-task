import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

export function completedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === true || value === false) {
      return null;
    }
    return { invalidCompleted: true };
  };
}

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.scss'],
})
export class CreateTodoFormComponent {
  @Output() createTodo = new EventEmitter();

  public form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    userId: new FormControl('', [Validators.required]),
    completed: new FormControl(false, [Validators.required, completedValidator()])
  });

  private getCompletedValue(): boolean {
    return this.form.get('completed')?.value === true;
  }

  public submitForm(): void {
    console.log('Form submitted. Valid:', this.form.valid, 'Value:', this.form.value);
    if (this.form.valid) {
      const todoData = { ...this.form.value, completed: this.getCompletedValue() };
      console.log('Emitting createTodo:', todoData);
      this.createTodo.emit(todoData);
      this.form.reset({ completed: false });
    } else {
      console.error('Form invalid. Errors:', this.form.errors);
    }
  }
}