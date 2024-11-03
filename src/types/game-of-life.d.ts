export {};

declare global {
  namespace GameOfLife {
    interface Cell {
      state: 'alive' | 'dead';
    }

    interface Board {
      cells: Cell[][];
      rows: number;
      cols: number;
    }
  }
}
