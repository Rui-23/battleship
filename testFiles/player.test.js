const player = require('../player');
const computer = require('../player');

describe('basic infos: ', () => {
  test('computer ships', () => {
    expect(computer.battleships[3].size).toBe(4);
  });
  
  test('player ships', () => {
    expect(player.battleships[3].size).toBe(4);
  });
});

test('computer attact once', () => {
  expect(player.battleships[0].hits).toBe(1);
  expect(player.battleships[0].haveSunk).toBe(true);
  expect(player.myBoard.board[1][2]).toMatch('🔴');
});

test('player attack twice', () => {
  expect(player.shoots.size).toBe(2);
  expect(player.myBoard.missedAttacks[0]).toEqual([7, 7]);
});

