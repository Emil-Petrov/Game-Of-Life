import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cells: GameOfLife.Board['cells'] = [];
  columns: number = 100;
  rows: number = 50;

  constructor() {
    this.generateRandomCells()
  }

  public generateRandomCells() {
    this.cells = [...new Array(this.rows).keys()].reduce<GameOfLife.Board["cells"]>((items) => {
      return [...items, [...new Array(this.columns).keys()].map(() => ({
        state: Math.random() <= .25 ? "alive" : "dead",
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
    const newArray = this.cells.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const aliveNeighbours = this.getAliveNeighboursCount(rowIndex, cellIndex)

        const shouldStayAlive = cell.state === "alive" && aliveNeighbours === 2 || aliveNeighbours === 3;
        const shouldBecomeAlive = aliveNeighbours === 3;

        const state = shouldStayAlive || shouldBecomeAlive ? 'alive' : 'dead';
        
        return { state };
      });
    }) as GameOfLife.Board["cells"];

    newArray.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
      this.cells[rowIndex][colIndex].state = col.state;
    }))
  }
}
