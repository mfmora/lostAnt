class Wall {
  constructor(coord) {
    this.coord = coord;
    this.posX = coord[0];
    this.posY = coord[1];
    this.width = coord[2] - this.posX;
    this.height = coord[3] - this.posY;
  }

  inWall(position) {
    if(this.inX(position[0]) && this.inY(position[1])) {
      return true;
    } else {
      return false;
    }
  }

  inX(pos) {
    if ((pos > this.posX) && (pos < this.posX + this.width)) {
      return true;
    } else {
      return false;
    }
  }

  inY(pos) {
    if ((pos > this.posY) && (pos < this.posY + this.height)) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Wall;
