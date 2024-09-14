const Ship = require('../battleship');

const carrier = new Ship(4);

describe.skip('ship info: ', () => {
  test('ship size', () => {
    expect(carrier.size).toBe(4);
  });

  test('ship been hit zero times', () => {
    expect(carrier.hits).toBe(0);
  });

  test('ship been sunk', () => {
    expect(carrier.haveSunk).toBe(false);
    expect(carrier.isSunk()).not.toBe(true);
  });
});

describe.skip('ship hits: ', () => {

  test('ship been hit once', () => {
    carrier.hit();
    expect(carrier.hits).toBe(1);
  });


  test('ship been hit twice', () => {
    carrier.hit();
    expect(carrier.hits).toBe(2);
  });

  test('ship been hit four times', () => {
    carrier.hit();
    carrier.hit();
    expect(carrier.hits).toBe(4);
  });
});

test.skip('ship is sunk', () => {
  expect(carrier.isSunk()).toBe(true);
  expect(carrier.haveSunk).not.toBe(false);
});
