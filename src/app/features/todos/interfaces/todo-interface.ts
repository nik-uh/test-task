export interface TodoDTO {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoEntity {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoDTO {
  userId: number;
  title: string;
  completed: boolean;
}
