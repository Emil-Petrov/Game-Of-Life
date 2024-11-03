import { Component, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public gameService: GameService) {}

  private intervalId: number = 0;

  isAutoGenerating = false;

  startInterval() {
    if (typeof window === undefined) return;

    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      this.gameService.nextGeneration();
    }, 250);
  }

  stopInterval() {
    if (!this.intervalId) return;

    window.clearInterval(this.intervalId);
  }

  toggleInterval() {
    this.isAutoGenerating = !this.isAutoGenerating;

    if (this.isAutoGenerating) {
      this.intervalId = window.setInterval(() => {
        this.gameService.nextGeneration();
      }, 250)
    } else {
      window.clearInterval(this.intervalId);
    }
  }
}
