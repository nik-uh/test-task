import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="home">
      <h1>Добро пожаловать!</h1>
      <nav>
        <a routerLink="/users" class="link"> Пользователи</a>
        <a routerLink="/tasks" class="link"> Задачи</a>
      </nav>
    </div>
  `,
  styles: [`
    .home {
      text-align: center;
      margin-top: 40px;
      font-family: sans-serif;
    }

    nav {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .link {
      padding: 10px 16px;
      border-radius: 8px;
      text-decoration: none;
      background: #3C4EAE;
      color: white;
      font-weight: bold;
      transition: 0.2s;
    }

    .link:hover {
      background: #3C4EAE;
    }
  `]
})
export class HomeComponent {}
