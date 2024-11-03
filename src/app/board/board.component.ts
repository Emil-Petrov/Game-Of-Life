import { Component, Input, input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CellComponent, CommonModule],
  selector: 'app-board',
  standalone: true,
  styleUrl: './board.component.scss',
  templateUrl: './board.component.html',
})
export class BoardComponent {
  @Input() cells: GameOfLife.Cell[][] = [[]];
}
