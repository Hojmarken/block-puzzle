class Blocker extends Rect {
  constructor(i, j) {
    super(i, j);
    this.blocks = [1, 2];
    this.action = empty;
  }
  get others() {
    return opponents;
  }
  update() {
    let array = [].concat(players);
    outer: for (let i = array.length - 1; i >= 0; i--) {
      for (let j = 0; j < this.blocks.length; j++) {
        if (grid[array[i].i][array[i].j] == this.blocks[j]) {
          array.splice(i, 1);
          continue outer;
        }
      }
    }
    if (array.length !== 0) {
      let plane = [];

      for (let i = 0; i < h; i++) {
        plane[i] = [];
        for (let j = 0; j < w; j++) {
          plane[i][j] = grid[i][j];
        }
      }
      for (let i = 0; i < this.others.length; i++) {
        plane[this.others[i].i][this.others[i].j] = 1;
      }
      for (let i = array.length - 1; i >= 0; i--) {
        array[i] = {
          l: aStar(this.j, this.i, array[i].j, array[i].i, plane),
          g: array[i]
        };
      }
      array.sort((a, b) => a.l.length - b.l.length);
      if (array[0].l.length == 1) {
        restartGame();
      } else if (array[0].l.length == 2) {
        this.action();
      } else if (array[0].l.length !== 0) {
        this.i = array[0].l[1].y;
        this.j = array[0].l[1].x;
      }
    }
  }
}




class Opponent extends Blocker {
  constructor(i, j) {
    super(i, j);
    this.action = restartGame;
  }
  get others() {
    return blockers;
  }
}
