class Game {
  constructor(start, map) {
    this.posX = start[0];
    this.posY = start[1];
    this.map = map;
  }

  move(position) {

  }

  draw(ctx) {
    ctx.fillStyle = "ffff";
    ctx.fillRect(this.posX, this.posY, 5, 5);
  }
}

module.exports = Game;
