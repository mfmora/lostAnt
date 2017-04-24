class Game {
  constructor(start, map) {
    this.posX = start[0];
    this.posY = start[1];
    this.map = map;
  }

  move(position) {
    let newPosX = this.posX + position[0] * Game.SPEED;
    let newPosY = this.posY + position[1] * Game.SPEED;

    if (this.map.validMove([newPosX, newPosY])) {
      this.posX = newPosX;
      this.posY = newPosY;
    } 
  }

  draw(ctx) {
    let img = new Image();
    img.src = "images/ant2.png";
    ctx.drawImage(img, this.posX, this.posY, 20, 20);
  }
}

Game.SPEED = 3;

module.exports = Game;
