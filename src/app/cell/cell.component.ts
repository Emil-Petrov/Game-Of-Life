import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  @Input() state: GameOfLife.Cell['state'] = 'dead';
  
  @Input() neighbours: GameOfLife.Cell['neightbours'] = 0;
}
