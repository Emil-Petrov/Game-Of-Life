import { Component, Input, input } from '@angular/core';
import { CellComponent } from "../cell/cell.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CellComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() cells: GameOfLife.Board["cells"] = [];

  @Input() columns: number = 0;
  @Input() rows: number = 0;
}
