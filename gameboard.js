//const Ship = require('./battleship');
import { Ship } from './battleship.js';

export class Gameboard {
  constructor() {
    this.board = this.setBoard();
    this.ships = [];
    this.missedAttacks = [];
    this.shipCoordinates = new Set();
    // this.shoots = new Set();
  }

  setBoard() {
    const board = [];
    for(let i = 0; i < 10; i++) {
      board[i] = [];
      for(let j = 0; j < 10; j++) {
        board[i][j] = '⬜️';
      }
    }
    return board;
  }
  
  placeShips(shipname, size, start=[startX, startY], end=[endX, endY]) {
    const ship = new Ship(size, shipname);
    const [startX, startY] = start;
    const [endX, endY] = end;
    const location = [];
    if (size > 1) {
      if (startX === endX) {
        for(let y = startY; y<= endY; y++) {
          //this.board[startX][y] = '⬛️';
          location.push([startX, y]);
        }
      } else if (startY === endY) {
        for (let x = startX; x <= endX; x++) {
          //this.board[x][startY] = '⬛️';
          location.push([x, startY]);
        }
      } 
    } else {
      this.board[startX][startY] = '⬛';
      location.push(start);
    } 

    if (this.checkOverlap(location)) {
      throw new Error('Ship overlaps with another ship');
    }

    for(let i = 0; i < size; i++) {
      if (startX === endX) {
        this.board[startX][startY+i] = '⬛️';
      } else if (startY === endY) {
        this.board[startX+i][startY] = '⬛️';
      }
    }

    location.forEach(coord => this.shipCoordinates.add(coord.toString()));
    this.ships.push({ship, location}); 
    return ship;
  }

  checkOverlap(location) {
    return location.some(coord => this.shipCoordinates.has(coord.toString()));
  }

  receiveAttack(attackPo=[row, col]) {
    const [row, col] = attackPo;
    for(const ship of this.ships) {
      for(const pos of ship.location) {
        if (row === pos[0] && col === pos[1]) {
          this.board[row][col] = '❌';
          ship.ship.hit();
          console.log(`${ship.ship.name} has been hit`);
          return ship.ship.name;
        } 
      }
    } 
    this.missedAttacks.push(attackPo);
    this.board[row][col] = '⦿';
    console.log('missed attack');
    return null;
  }

  allSunk() {
    if (this.ships.every(ship => ship.ship.isSunk())) {
      console.log('Game Over! The battleships have all been sunk.');
      return true;
    } else {
      return false;
    }
  }
}

//module.exports = Gameboard;
/*
placeShips(shipname, size, startLocation=[row, col], direction) {
  const ship = new Ship(size, shipname);
  const [row, col] = startLocation;
  const location = [];
  if (size > 1) {
    for(let i = 0; i < size; i++) {
      if (direction === 'horizontal') {
        this.board[row][col+i] = '⬛️';
        location.push([row, col+i]);
      } else if (direction === 'vertical') {
        this.board[row+i][col] = '⬛️';
        location.push([row+i, col]);
      }
    }
  } else {
    this.board[row][col] = '⬛';
    location.push(startLocation);
  } 
  this.ships.push({ship, location}); 
  return ship;
  //return {ship, location};
}
*/

/*
const myBoard = new Gameboard();
myBoard.receiveAttack([6, 5]);
myBoard.receiveAttack([9, 4]);
myBoard.receiveAttack([3, 3]);
//console.log(myBoard.board);
myBoard.receiveAttack([3, 4]);
myBoard.receiveAttack([1, 2]);
console.log(myBattleships);
console.log("Missed attacks: ");
console.log(myBoard.missedAttacks);
console.log(myBoard.board);
*/