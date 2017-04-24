const LevelInfo = require("./level_info");

class Map {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.level = LevelInfo.LEVELS[level];
    this.walls = this.level["walls"].map( wall => {
      return wall.map((value, idx) => {
        return (idx % 2 == 0) ? value * canvas.width : value * canvas.height;
      });
    });
    window.walls = this.walls;
  }
}

module.exports = Map;
