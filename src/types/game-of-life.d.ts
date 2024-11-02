export {};

declare global {
  namespace GameOfLife {
    interface Cell {
      state: 'alive' | 'dead';
      neightbours: number;
    }

    interface Board {
      cells: Cell[][];
      rows: number;
      cols: number;
    }
  }
}
