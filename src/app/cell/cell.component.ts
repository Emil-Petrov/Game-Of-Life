import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-cell',
  standalone: true,
  styleUrl: './cell.component.scss',
  templateUrl: './cell.component.html',
})
export class CellComponent {
  @Input() state: GameOfLife.Cell['state'] = 'dead';

  toggle() {
    this.state = this.state === 'alive' ? 'dead' : 'alive';
  }
}
