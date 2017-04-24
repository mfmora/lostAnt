const LevelInfo = require("./level_info");
const Game = require("./game");

class Map {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.level = LevelInfo.LEVELS[level];
    this.walls = this.level["walls"].map( wall => {
      return wall.map((value, idx) => {
        return (idx % 2 == 0) ? value * canvas.width : value * canvas.height;
      });
    });
    const posX = this.level["start"]["x"] * canvas.width;
    const posY = this.level["start"]["y"] * canvas.height;

    this.game = new Game(posX, posY, this);

    window.walls = this.walls;
  }

  draw(ctx) {
    this.game.draw(ctx);
    //Draw walls
  }
}

module.exports = Map;
