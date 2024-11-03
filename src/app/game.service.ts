import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cells: GameOfLife.Board['cells'] = [];
  columns: number = 25;
  rows: number = 25;

  constructor() {
    this.generateRandomCells()
  }

  public generateRandomCells() {
    this.cells = [...new Array(this.rows).keys()].reduce<GameOfLife.Board["cells"]>((items) => {
      return [...items, [...new Array(this.columns).keys()].map(() => ({
        state: !!Math.round(Math.random()) ? "alive" : "dead",
      }))];
    }, [] as GameOfLife.Board["cells"])
  }

  private getAliveNeighboursCount(rowIndex: number, columnIndex: number) {
    const previousRow = this.cells[rowIndex - 1] || [];
    const currentRow = this.cells[rowIndex];
    const nextRow = this.cells[rowIndex + 1] || [];

    const aliveNeighbours = [
      ...[
        previousRow[columnIndex - 1],
        previousRow[columnIndex],
        previousRow[columnIndex + 1],
      ],
      ...[
        currentRow[columnIndex - 1],
        currentRow[columnIndex + 1],
      ],
      ...[
        nextRow[columnIndex - 1],
        nextRow[columnIndex],
        nextRow[columnIndex + 1]
      ]
    ].filter(cell => cell?.state === "alive").length;


    return aliveNeighbours;
  }

  nextGeneration() {
    this.cells = this.cells.map((row, rowIndex) => {
      return row.map((_, cellIndex) => {
        const aliveNeighbours = this.getAliveNeighboursCount(rowIndex, cellIndex)

        const state = (aliveNeighbours === 2 || aliveNeighbours === 3) ? 'alive' : 'dead';

        return { state };
      });
    });
  }
}
