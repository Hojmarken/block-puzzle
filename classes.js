class Rect {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }
  draw() {
    rect(this.j * size, this.i * size, size, size);
  }
}

class Teleporter {
  constructor(i1, j1, i2, j2) {
    this.i1 = i1;
    this.j1 = j1;
    this.i2 = i2;
    this.j2 = j2;
  }
  draw() {
    rect(this.j1 * size, this.i1 * size, size, size);
    rect(this.j2 * size, this.i2 * size, size, size);
  }
}


function aStar(x1, y1, x2, y2, plane) {
  //CLASS
  class Node {
    constructor(x1, y1, parent, x2, y2) {
      this.x = x1;
      this.y = y1;
      this.parent = parent;
      this.g = this.parent.g + 1;
      this.h = Math.abs(x2 - x1 + y2 - y1);
      this.f = this.g + this.h;
    }
    calc() {
      this.g = this.parent.g + 1;
      this.f = this.g + this.h;
    }
  }

  let open = [new Node(x1, y1, {
    g: -1
  }, x2, y2)];
  let closed = [];
  let impossible = false;

  while (true) {
    let current = {
      f: Infinity
    };
    //FIND BEST CANDIDATE IN OPEN
    for (i = open.length - 1; i >= 0; i--) {
      if ((open[i].f < current.f) || (open[i].f == current.f && open[i].h < current.h)) {
        current = open[i];
        current.i = i;
      }
    }
    closed.push(current);
    //STOP IF CURRENT == DESTINATION
    if (current.x == x2 && current.y == y2) {
      break;
    }
    open.splice(current.i, 1);
    //CHECK NEIGHBORS
    for (let i = -1; i <= 1; i += 2) {
      if (current.x + i >= 0 && current.x + i < w && plane[current.y][current.x + i] !== 1 && plane[current.y][current.x + i] !== 2) {
        let j = 0
        while (j < closed.length) {
          if (current.x + i == closed[j].x && current.y == closed[j].y) {
            j = closed.length + 1;
            break;
          }
          j++;
        }
        if (j !== closed.length + 1) {
          let v = 0
          while (v < open.length) {
            if (current.x + i == open[v].x && current.y == open[v].y) {
              if (current.g + 1 < open[v].g) {
                open[v].parent = current;
                open[v].calc();
              }
              v = open.length + 1;
              break;
            }
            v++;
          }
          if (v !== open.length + 1) {
            open.push(new Node(current.x + i, current.y, current, x2, y2));
          }
        }
      }
      if (current.y + i >= 0 && current.y + i < h && plane[current.y + i][current.x] !== 1 && plane[current.y + i][current.x] !== 2) {
        let j = 0
        while (j < closed.length) {
          if (current.x == closed[j].x && current.y + i == closed[j].y) {
            j = closed.length + 1;
            break;
          }
          j++;
        }
        if (j !== closed.length + 1) {
          let v = 0
          while (v < open.length) {
            if (current.x == open[v].x && current.y + i == open[v].y) {
              if (current.g + 1 < open[v].g) {
                open[v].parent = current;
                open[v].calc();
              }
              v = open.length + 1;
              break;
            }
            v++;
          }
          if (v !== open.length + 1) {
            open.push(new Node(current.x, current.y + i, current, x2, y2));
          }
        }
      }
    }
    //CHECK IF THERE ARE NO SOLUTIONS
    if (open.length == 0) {
      impossible = true;
      break;
    }
  }
  //IF NO SOLUTIONS
  if (impossible == true) {
    return [];
  }
  //WORK BACKWARDS TO FIND PATH
  let path = [];
  let placeholder = closed.pop();
  while (true) {
    if (placeholder.g == -1) {
      break;
    }
    path.push({
      x: placeholder.x,
      y: placeholder.y
    });
    placeholder = placeholder.parent;
  }

  return path.reverse();
}
