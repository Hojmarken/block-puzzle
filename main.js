let cnv;
let grid = [];
let w = 18;
let h = 13;
let mapNumber = 0;
let mapArray = [];
let size = 40;
let players = [];
let blockers = [];
let foods = [];
let moveCount = 0;
let opponents = [];
let teleporters = [];

//ADD SHIFTING BLOCK ON/OFF/ON/OFF
//ADD MAP-QUEUE

function setup() {
  assignMap();
  cnv = createCanvas(w * size, h * size);
  noStroke();
  restartGame();
}



function keyPressed() {
  if (keyCode == 37) {
    playerMove(-1, 0);
  } else if (keyCode == 38) {
    playerMove(0, -1);
  } else if (keyCode == 39) {
    playerMove(1, 0);
  } else if (keyCode == 40) {
    playerMove(0, 1);
  } else if (keyCode == 82) {
    restartGame();
  }
}


function updateGame() {
  opponents.forEach(x => x.update());
  blockers.forEach(x => x.update());
}

function drawGame() {
  background(255);
  drawGrid();
  fill(107, 232, 28);
  foods.forEach(x => x.draw());
  fill(242, 247, 37);
  teleporters.forEach(x => x.draw());
  fill(40, 120, 206);
  players.forEach(x => x.draw());
  fill(220, 38, 38);
  opponents.forEach(x => x.draw());
  fill(42, 100, 99);
  blockers.forEach(x => x.draw());
}

function playerMove(x, y) {
  players.forEach(l => l.move(x, y));
  if (moveCount !== 0) {
    updateGame();
    drawGame();
    moveCount = 0;
  }
}

function drawGrid() {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (grid[i][j] == 1) {
        fill(0);
        rect(j * size, i * size, size, size);
      } else if (grid[i][j] == 2) {
        fill(165, 181, 195);
        rect(j * size, i * size, size, size);
      } else if (grid[i][j] == 3) {
        fill(153, 108, 110);
        rect(j * size, i * size, size, size);
      }
    }
  }
}

function clearArrays() {
  players = [];
  opponents = [];
  blockers = [];
  foods = [];
  teleporters = [];
}

function empty() {
  //This is empty on purpose
}

function fillBlack() {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      grid[i][j] = 1;
    }
  }
}

function restartGame() {
  mapArray[mapNumber]();
  drawGame();
}

function levelWon() {
  mapNumber++;
  clearArrays();
  restartGame();
}

function createGrid() {
  for (let i = 0; i < h; i++) {
    grid[i] = [];
    for (let j = 0; j < w; j++) {
      if (j == 0 || i == 0 || j == w - 1 || i == h - 1) {
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }
    }
  }
}
