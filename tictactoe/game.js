const Board = require('./board');
const MoveError = require('./moveError')

class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = Board.marks[0];
  }

  isOver() {
    return this.board.isOver();
  }

  playMove(pos) {
    this.board.placeMark(pos, this.currentPlayer);
    this.swapTurn();
  }

  promptMove(reader, callback) {
    const game = this;

    this.board.print();
    console.log('current turn is ${this.currentPlayer}')

    reader.question('Enter Row idx', rowIdxstr => {
      const rowIdx = parseInt(rowIdxstr);
      reader.question('Enter Col idx', colIdxstr => {
        const colIdx = parseInt(colIdxstr);
        callback([rowIdx, colIdx]);
      });
    });
  }

  run(reader, gamecompletionCallback) {
    this.promptMove(reader, move => {
      try {
        this.playMove(move);
      } catch (e) {
        if (e instanceof MoveError) {
          console.log(e.msg);
        } else {
          throw e;
        }
      }
      if (this.isOver()) {
        this.board.print();
        if (this.winner()) {
          console.log('${this.winner()} has won!');
        } else {
          console.log('no one wins');
        }
        gamecompletionCallback();
      } else {
        this.run(reader, gamecompletionCallback);
      }
    });
  }

  winner() {
    return this.board.winner();
  }
}


module.exports = Game;










module.exports = Game;
