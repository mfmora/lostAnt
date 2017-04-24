class Game {
  constructor(start, map) {
    this.posX = start[0];
    this.posY = start[1];
    this.map = map;
  }

  move(position) {
    this.posX += position[0] * Game.SPEED;
    this.posY += position[1] * Game.SPEED;
  }

  draw(ctx) {
    // ctx.fillStyle = "#ffffff";
    // ctx.fillRect(this.posX, this.posY, 5, 5);
    let img = new Image();
    img.src = "images/ant2.png";
    ctx.drawImage(img, this.posX, this.posY, 20, 20);
  }
}

Game.SPEED = 2;

module.exports = Game;
