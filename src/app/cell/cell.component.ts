import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GameService } from '../game.service';

@Component({
  imports: [CommonModule],
  selector: 'app-cell',
  standalone: true,
  styleUrl: './cell.component.scss',
  templateUrl: './cell.component.html',
})
export class CellComponent {
  @Input() state: GameOfLife.Cell['state'] = 'dead';
  @Output() stateChange = new EventEmitter<GameOfLife.Cell['state']>();

  constructor(private gameService: GameService) {}

  toggle() {
    if (this.gameService.spawnMode()) {
      this.state = this.state === 'alive' ? 'dead' : 'alive';
      this.stateChange.emit(this.state);
    }
  }
}
