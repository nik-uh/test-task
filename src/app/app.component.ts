import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <header>
      <nav class="nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">🏠 Главная</a>
        <a routerLink="/users" routerLinkActive="active">👤 Пользователи</a>
        <a routerLink="/tasks" routerLinkActive="active">✅ Задачи</a>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background: #3C4EAE;
      padding: 12px 20px;
    }

    .nav {
      display: flex;
      gap: 20px;
    }

    .nav a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      transition: 0.2s;
    }

    .nav a.active {
      text-decoration: underline;
    }

    .nav a:hover {
      opacity: 0.8;
    }

    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {}
