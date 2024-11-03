export {};

declare global {
  namespace GameOfLife {
    interface Cell {
      state: 'alive' | 'dead';
    }
  }
}
