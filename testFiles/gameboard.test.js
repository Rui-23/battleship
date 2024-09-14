const Gameboard = require('../gameboard');
const Ship = require('../battleship');

const myBoard = new Gameboard();
const ship1 = myBoard.placeShips(1, [1, 2], 'horizontal');
const ship2 = myBoard.placeShips(2, [3, 3], 'horizontal');
const ship3 = myBoard.placeShips(3, [6, 5], 'vertical');

describe.skip('my board: ', () => {
  test('my battleships: ', () => {
    expect(myBoard.ships.length).toBe(3);
    expect(myBoard.ships[0].ship.size).toBe(1);
    expect(myBoard.ships[2].ship.hits).toBe(0);
  });

  test('ship 3 is hit', () => {
    myBoard.receiveAttack([6, 5]);
    //expect(myBoard.board[6][5]).toMatch('❌');
    expect(myBoard.board[6][6]).not.toMatch('⬛️');
    expect(myBoard.ships[2].ship.hits).toBe(1);
  });

  test('ship 2 is hit', () => {
    expect(myBoard.board[3][3]).toMatch('⬛️');
    expect(myBoard.board[3][4]).toMatch('⬛️');
  });

  test('missed attacks', () => {
    //myBoard.receiveAttack([9, 4]);
    //expect(myBoard.missedAttacks[0]).toEqual([9, 4]);
  });
});

