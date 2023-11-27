/* eslint-disable */

const emptySymbol = ' ';
const playerOneSymbol = 'O';

const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;

export class Game {
  private _lastSymbol = ' ';

  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptySymbol) {
      if (player == playerOneSymbol) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != emptySymbol) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this._board.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this._board.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this._board.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptySymbol;
  }

  private isRowFull(row : number){
    return (
      this._board.TileAt(row, firstColumn)!.Symbol != emptySymbol &&
      this._board.TileAt(row, secondColumn)!.Symbol != emptySymbol &&
      this._board.TileAt(row, thirdColumn)!.Symbol != emptySymbol
    );
  }
  
  private isRowFullWithSameSymbol(row :number) {
    return (
      this._board.TileAt(row, firstColumn)!.Symbol == this._board.TileAt(row, secondColumn)!.Symbol &&
      this._board.TileAt(row, thirdColumn)!.Symbol == this._board.TileAt(row, secondColumn)!.Symbol
    );
  }

  
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: emptySymbol };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}