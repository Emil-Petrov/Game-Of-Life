import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cells: GameOfLife.Cell[][] = [];
  columnsCount = 100;
  rowsCount = 50;
  chanceToSpawnAlive = 0.25;

  spawnMode = signal(false);

  constructor() {
    this.generateRandomCells();
  }

  public generateRandomCells() {
    this.cells = [...new Array(this.rowsCount).keys()].reduce<
      typeof this.cells
    >((items) => {
      return [
        ...items,
        [...new Array(this.columnsCount).keys()].map(() => ({
          state: Math.random() <= this.chanceToSpawnAlive ? 'alive' : 'dead',
        })),
      ];
    }, []);
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
      ...[currentRow[columnIndex - 1], currentRow[columnIndex + 1]],
      ...[
        nextRow[columnIndex - 1],
        nextRow[columnIndex],
        nextRow[columnIndex + 1],
      ],
    ].filter((cell) => cell?.state === 'alive').length;

    return aliveNeighbours;
  }

  nextGeneration() {
    // Calculate new generation
    const newGeneration: typeof this.cells = this.cells.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const aliveNeighbours = this.getAliveNeighboursCount(
          rowIndex,
          cellIndex,
        );

        const shouldStayAlive =
          cell.state === 'alive' &&
          (aliveNeighbours === 2 || aliveNeighbours === 3);
        const shouldBecomeAlive = aliveNeighbours === 3;

        const state = shouldStayAlive || shouldBecomeAlive ? 'alive' : 'dead';

        return { state };
      });
    });

    // Use new generation to replace old generation states. Otherwise everything re-renders and CSS transitions don't work
    newGeneration.forEach((row, rowIndex) =>
      row.forEach((cell, cellIndex) => {
        this.cells[rowIndex][cellIndex].state = cell.state;
      }),
    );
  }
}
