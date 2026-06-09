import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('quran-track-web');
  constructor(private readonly authService: AuthService) {
  if (this.authService.getAccessToken()) {
    this.authService.loadCurrentUser().subscribe({
      error: () => this.authService.logout()
    });
  }
}

}
