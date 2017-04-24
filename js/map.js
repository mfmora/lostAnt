const LevelInfo = require("./level_info");
const Game = require("./game");
const Wall = require("./wall");

class Map {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.level = LevelInfo.LEVELS[level];
    this.walls = this.level["walls"].map( wall => {
      return wall.map((value, idx) => {
        return (idx % 2 == 0) ? value * canvas.width : value * canvas.height;
      });
    }).map(result => new Wall(result));
    const posX = this.level["start"]["x"] * canvas.width;
    const posY = this.level["start"]["y"] * canvas.height;

    this.game = new Game([posX, posY], this);

    window.walls = this.walls;
  }

  draw(ctx) {
    this.game.draw(ctx);
    //Draw walls
  }

  validMove(position) {
    //Check if there is a wall
    let noWall = true;
    this.walls.forEach(wall => {
      if(wall.inWall(position)) {
        noWall = false;
      };
    });
    return noWall;
    //Check that it's not outside the borders
  }
}

module.exports = Map;
