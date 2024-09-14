import { Player } from './player.js';

const gameboards = document.querySelector('.gameboards');
const startboard = document.querySelector('.start-board');
const resultsboard = document.querySelector('.results-board');
const playBtn = document.querySelector('#js-play-btn');
const replayBtn = document.querySelector('#js-replay-btn');

const computerBoard = document.querySelector('.computerBoard');
const playerBoard = document.querySelector('.playerBoard');
const computerView = document.querySelector('.computerView');
const playerView = document.querySelector('.playerView');

//select audio element for sounds
const bompSound = document.getElementById('gunshot-sound');
const missSound = document.getElementById('miss-sound');

let gameOn = false;
let activePlayer;
let player, computer;

//letcomputer try adjacent slots after getting a ‘hit’. 
let lastShootWasAHit = false;
let lastShootCoord;
//let options = null;
let options;

playBtn.addEventListener('click', () => {
  startboard.style.display = 'none';
  gameboards.style.display = "block";
  activePlayer = 'Player';
  startgame();
});

replayBtn.addEventListener('click', () => {
  gameboards.style.display = "block";
  resultsboard.style.display = 'none';
  clearBoard();
  console.log('Start a new game:');
  activePlayer = 'Computer';
  startgame();
  setTimeout(computerMove, 2000);
})

function startgame() {
  computer = new Player();
  player = new Player();
  gameOn = true;

  replaceShip(player, 'destroyer', 0, 1, [4, 0], [4, 0]);
  replaceShip(player, 'newship', 6, 3, [6, 1], [6, 3]);
  replaceShip(player, 'submarine',4, 2, [2, 1], [2, 2]);
  replaceShip(player, 'carrier', 9, 4, [3, 5], [3, 8]);

  replaceShip(computer, 'cruiser' , 8, 3, [7, 4], [7, 6]);
  //console.log(computer);

  renderBoard(computerBoard, computer);
  renderBoard(playerBoard, player);

  populateViewBoard(playerView, true);
  populateViewBoard(computerView, false);
}

function replaceShip(role, name, index, size, start, end) {
  let deleteShipCoords = role.myBoard.ships[index].location;
  deleteShipCoords.forEach(coord => {
    role.myBoard.shipCoordinates.delete(coord.toString());
    role.myBoard.board[coord[0]][coord[1]] = '⬜️';
  });
  const [startX, startY] = start;
  const [endX, endY] = end;
  role.battleships[index] = role.myBoard.placeShips(name, size, [startX, startY], [endX, endY]);
  let lastIndex = role.myBoard.ships.length-1;
  let newShip = role.myBoard.ships[lastIndex];
  role.myBoard.ships.splice(index, 1, newShip);
  role.myBoard.ships.splice(lastIndex, 1);
}

function handleAttack(event) {
  if (activePlayer !== 'Player') return; 
  let coordinates = getCoordinates(event.target);
  let [x, y] = coordinates;
  if (computer.myBoard.board[x][y] === '❌' || computer.myBoard.board[x][y] === '⦿') return;
  markBoard(event.target, computer, computerBoard, coordinates);
  checkResults(computer);
  if(gameOn) {
    activePlayer = 'Computer';
    setTimeout(computerMove, 1000);
  }
}

function computerMove() {
  let x, y, coordinates;
  
  if(lastShootWasAHit) {
    let [i, j] = lastShootCoord;
    let pos = [[i-1, j], [i+1, j], [i, j-1], [i, j+1]];
    console.log('Before filters: ' + pos.toString());

    pos = pos.filter(po =>
      po[0] >= 0 && po[0] <= 9 && po[1]>= 0 && po[1] <= 9 
    );
    console.log('Within borders: ' + pos.toString());

    pos = pos.filter(po => {
      let [m, n] = po;
      return player.myBoard.board[m][n] !== '❌' && player.myBoard.board[m][n]  !== '⦿'
    });
    console.log('Final options: ' + pos.toString());

    if(!pos[0]) {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        coordinates = [x, y];
      } while (player.myBoard.board[x][y] === '❌' || player.myBoard.board[x][y] === '⦿'); 
      console.log('No options here, then choose a random location ' + coordinates);
    } else {
      x = pos[0][0];
      y = pos[0][1];
      pos.shift()
      coordinates = [x, y];
      options = pos; //keep options for future attempts
      console.log('Last shot coord is ' + lastShootCoord + '. Now try adjcent coor: ' + coordinates);
    }   
  } else if (options) {
    if(!options[0]) {
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        coordinates = [x, y];
      } while (player.myBoard.board[x][y] === '❌' || player.myBoard.board[x][y] === '⦿');
      console.log('Options run out, then choose a random location ' + coordinates);
    } else {
      x = options[0][0];
      y = options[0][1];
      options.shift()
      coordinates = [x, y];
      console.log('Try last options: ' + coordinates);
      console.log('Options left: ' + options);
    }
  } else {
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      coordinates = [x, y]; 

    } while (player.myBoard.board[x][y] === '❌' || player.myBoard.board[x][y] === '⦿');
    
    console.log('Last shot was missed, now it shoots at ' + coordinates);
  }
  
  let target = computerView.querySelector(`[data-coordinates="${x} ${y}"]`);
  markBoard(target, player, playerBoard, coordinates);

  if(target.classList.contains('hit')) {
    lastShootWasAHit = true;
    lastShootCoord = coordinates;
  } else {
    lastShootWasAHit = false;
    lastShootCoord = null;
  }

  checkResults(player);
  if(gameOn) {
    activePlayer = 'Player';
  }
}

function getCoordinates(target, player) {
  let row = target.dataset.coordinates.at(0);
  let col = target.dataset.coordinates.at(2);
  let coordinates = [+row, +col];//Note: row and col are strings
  return coordinates;
}

function markBoard(target, enemy, enemyBoard, coordinates) {
  //if(coordinates === undefined) return;
  let shipname = enemy.myBoard.receiveAttack(coordinates);
  if(shipname) {
    //play bomp sound
    bompSound.currentTime = 0;
    bompSound.play();

    target.classList.add('hit');
    target.textContent = '❌';
    target.classList.add(shipname);
    ckeckShipSunk(shipname, enemy);
  } else {
    missSound.currentTime = 0;
    missSound.play();
    target.classList.add('miss');
    target.textContent = '•';
  }
  enemyBoard.textContent = '';
  renderBoard(enemyBoard, enemy);
}

function ckeckShipSunk(shipname, enemy) {
  for (const ship of enemy.battleships) {
    if (ship.name === shipname) {
      if(ship.isSunk()) {
        let sunkShip = 
          activePlayer === 'Player' 
          ? document.querySelectorAll(`.playerView .${shipname}`) 
          : document.querySelectorAll(`.computerView .${shipname}`);
         
        sunkShip.forEach(ship => {
          //ship.style.backgroundColor = 'orangered';
          ship.classList.add('sunk');
          ship.textContent = '';
        });
      }
    }
  }
}

function checkResults(enemy) {
  if(enemy.myBoard.allSunk()) {
    document.querySelector('.results').textContent = 'Congrats! ' + activePlayer + ' wins!';
    resultsboard.style.display = 'block';
    gameboards.style.display = "none";
    return gameOn = false;
  }
}

function populateViewBoard(board, isComputer) {
  for(let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    board.appendChild(row);
    for(let j= 0; j < 10; j++) {
      const col = document.createElement('span');
      col.dataset.coordinates = `${i} ${j}`;
      col.classList.add('col');
      row.appendChild(col);
      if(isComputer) {
        col.addEventListener('click', handleAttack);
      }
    }
  }  
}

function renderBoard(board, role) {
  for(let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    board.appendChild(row);
    for(let j= 0; j < 10; j++) {
      const col = document.createElement('span');
      col.dataset.coordinates = `${i} ${j}`;
      if(role.myBoard.board[i][j] === '⬜️') {
        col.style.backgroundColor = 'white';
      } else if(role.myBoard.board[i][j] === '❌') {
        //col.textContent = '❌';
        col.style.backgroundColor = 'lime';
      } else if(role.myBoard.board[i][j] === '⦿') {
        col.textContent = '•';
        col.style.backgroundColor = 'lightgray';
      } else {
        col.style.backgroundColor = 'black';
      }
      col.className = 'col';
      row.appendChild(col);
    }
  }  
}

function clearBoard() {
  computerBoard.textContent = '';
  playerBoard.textContent = '';
  computerView.textContent = '';
  playerView.textContent = '';
}

/*
function switchPlayerTurn() {
  return activePlayer = 
    activePlayer === player ? 
    computer : player;
}
*/

/*
function computerMove(playerGrids, player, computer, activePlayer) {
  playerGrids.forEach(grid => {
    grid.addEventListener('click', (e) => {
      let coordinates = getCoordinates(e.target, computer);
      markBoard(e.target, player, playerBoard, coordinates, "Computer");
      checkResults(player, 'Computer', activePlayer);
    });
  });
}

function playerMove (computerGrids, player, computer, activePlayer) {
  computerGrids.forEach(grid => {
    grid.addEventListener('click', (e) => {
      let coordinates = getCoordinates(e.target, player);
      markBoard(e.target, computer, computerBoard, coordinates, 'Player');
      checkResults(computer, 'Player', activePlayer);
    });
  });
}
*/

/*
function startgame() {
  computer = new Player();
  player = new Player();
  gameOn = true;

  renderBoard(computerBoard, computer);
  renderBoard(playerBoard, player);

  populateViewBoard(playerView, true);
  populateViewBoard(computerView, false);

  const computerGrids = document.querySelectorAll('.playerView .col');
  const playerGrids = document.querySelectorAll('.computerView .col');
  playerMove(computerGrids, player, computer); //player's guess
  computerMove(playerGrids, player, computer); //computer's guess
 }

 function getCoordinates(target, player) {
  let row = target.dataset.coordinates.at(0);
  let col = target.dataset.coordinates.at(2);
  let coordinates = [+row, +col];//Note: row and col are strings
  if(player.myBoard.shoots && player.myBoard.shoots.has(coordinates.toString())) {
    console.log('Choose a new grid.');
    return undefined;
  }
  player.myBoard.shoots.add(coordinates.toString());
  return coordinates;
}
*/