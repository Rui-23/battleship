//const Gameboard = require('./gameboard');
import { Gameboard } from './gameboard.js';

export class Player {
  constructor() {
    this.myBoard = new Gameboard();
    this.battleships = [
      this.myBoard.placeShips('destroyer1', 1, [1, 1], [1, 1]), 
      this.myBoard.placeShips('destroyer2', 1, [0, 3], [0, 3]),
      this.myBoard.placeShips('destroyer3', 1, [8, 1], [8, 1]),
      this.myBoard.placeShips('destroyer4', 1, [9, 3], [9, 3]),
      this.myBoard.placeShips('submarine1', 2, [3, 3], [4, 3]), 
      this.myBoard.placeShips('submarine2', 2, [0, 8], [0, 9]), 
      this.myBoard.placeShips('submarine3', 2, [6, 1], [6, 2]), 
      this.myBoard.placeShips('cruiser1', 3, [7, 9], [9, 9]), 
      this.myBoard.placeShips('cruiser2', 3, [5, 5], [7, 5]),
      this.myBoard.placeShips('carrier', 4, [2, 7], [5, 7])
    ];
  }
}

//module.exports = Player, Computer;

// const computer = new Computer();
// const player = new Player();
// computer.attack([1, 2]);
// player.attack([7, 7]);
// player.attack([3, 3]);
//module.exports = player, computer;

// console.log(computer.myBoard.board);
 //console.log(player.battleships, computer.battleships);
 //console.log(player.myBoard.missedAttacks, computer.myBoard.missedAttacks);
 //console.log(player.shoots, computer.shoots);