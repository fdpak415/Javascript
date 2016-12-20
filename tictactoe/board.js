const MoveError = require("./moveError");


class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  static makeGrid() {
    const grid = [];
    for (let i = 0; i < 3; i++) {
      grid.push([]);
      for (let j = 0; j < 3; j++) {
        grid[i].push(null);
      }
    }
    return grid;
  }

  isEmptyPos(pos) {
    if (!Board.isValidPos(pos)) {
      throw new MoveError('Not a valid Position');
    }
    return (this.grid[pos[0]][pos[1]] === null);
  }

  isOver() {
    if (this.winner() != null) {
      return true;
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.isEmptyPos([row, col])) {
          return false;
        }
      }
    }
    return true;
  }

  placeMark(pos, mark) {
    if (!this.isEmptyPos(pos)) {
      throw new MoveError('Not an empty position')
    }
    this.grid[pos[0]][pos[1]] = mark;
  }

  print() {
    const strs = [];
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      const marks = [];
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        marks.push(
          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
        );
      }
      strs.push(`${marks.join('|')}\n`);
    }

    console.log(strs.join('-----\n'));
  }

  winner() {
    const sections = [
      //horizontals
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      //verticals
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      //diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (let i = 0; i < sections.length; i++) {
      const winner = this.winnerHelper(sections[i]);
      if (winner != null) {
        return winner;
      }
    }
  }

    winnerHelper(section) {
      for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
        const targetMark = Board.marks[markIdx];
        let winner = true;
        for (let posIdx = 0; posIdx < 3; posIdx++) {
          const pos = section[posIdx];
          const mark = this.grid[pos[0]][pos[1]];

          if (mark != targetMark) {
            winner = false;
          }
        }

          if (winner) {
            return targetMark;
          }
      }
      return null;
    }

  static isValidPos(pos) {
    return (0 <= pos[0]) && (pos[0] < 3) &&
    (0 <= pos[1]) && (pos[1] < 3);
  }

}

Board.marks = ['x', 'o'];

module.exports = Board;
