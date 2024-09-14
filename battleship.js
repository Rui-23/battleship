export class Ship {
  constructor(size, name) {
    this.name = name;
    this.size = size;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.size;
  }
}
// const carrier = new Ship();
// console.log(carrier.isSunk());
// carrier.hit();
// carrier.isSunk();
// console.log(carrier);
// module.exports = Ship;
