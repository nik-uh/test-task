import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoEntity, CreateTodoDTO } from '../../features/todos/interfaces/todo-interface';

  @Injectable({ providedIn: 'root' })
  export class TodosApiService {
    private baseUrl = 'https://jsonplaceholder.typicode.com/todos'; 
  
    constructor(private http: HttpClient) {}
  
    getTodos(): Observable<TodoEntity[]> {
      return this.http.get<TodoEntity[]>(this.baseUrl);
    }
  
    addTodo(todoData: CreateTodoDTO): Observable<TodoEntity> {
      return this.http.post<TodoEntity>(this.baseUrl, todoData);
    }
  
    updateTodo(id: number, todoData: CreateTodoDTO): Observable<TodoEntity> {
      return this.http.patch<TodoEntity>(`${this.baseUrl}/${id}`, todoData);
    }
  
    deleteTodo(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  }