import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UsersComponent {
  users: User[] = [
    { id: 1, name: 'Иван', email: 'ivan@example.com', active: true },
    { id: 2, name: 'Анна', email: 'anna@example.com', active: false },
    { id: 3, name: 'Петр', email: 'petr@example.com', active: true }
  ];

  displayedColumns = ['id', 'name', 'email', 'active'];
  searchTerm = '';
  filter: 'all' | 'active' | 'inactive' = 'all';

  newUser: User = { id: 0, name: '', email: '', active: true };

  filteredUsers() {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFilter =
        this.filter === 'all' ||
        (this.filter === 'active' && user.active) ||
        (this.filter === 'inactive' && !user.active);
      return matchesSearch && matchesFilter;
    });
  }

  addUser() {
    if (!this.newUser.name || !this.newUser.email) return;

    const newId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push({ ...this.newUser, id: newId });
    this.newUser = { id: 0, name: '', email: '', active: true };
  }
}
