class Player extends Rect {
  constructor(i, j) {
    super(i, j);
  }
  move(x, y) {
    this.j += x;
    this.i += y;
    //ADD RED SAFE-ZONE
    if (grid[this.i][this.j] !== 1 && grid[this.i][this.j] !== 3) {
      let v = 0;
      while (v < blockers.length) {
        if (blockers[v].i == this.i && blockers[v].j == this.j) {
          this.i -= y;
          this.j -= x;
          v = blockers.length + 1;
          break;
        }
        v++;
      }
      if (v !== blockers.length + 1) {
        for (let i = foods.length - 1; i >= 0; i--) {
          if (this.i == foods[i].i && this.j == foods[i].j) {
            foods.splice(i, 1);
          }
        }
        if (foods.length == 0) {
          moveCount = 0;
          levelWon();
          return;
        }
        for (let i = 0; i < teleporters.length; i++) {
          if (this.i == teleporters[i].i1 && this.j == teleporters[i].j1) {
            this.i = teleporters[i].i2;
            this.j = teleporters[i].j2;
            moveCount++;
            return;
          } else if (this.i == teleporters[i].i2 && this.j == teleporters[i].j2) {
            this.i = teleporters[i].i1;
            this.j = teleporters[i].j1;
            moveCount++;
            return;
          }
        }
        moveCount++;
      }
    } else {
      this.i -= y;
      this.j -= x;
    }
  }
}
