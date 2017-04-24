const Map = require("./map");

class GameView {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.level = level;
    this.ctx = canvas.getContext("2d");
    this.map = new Map(canvas, level);

  }

  start() {

  }
}

module.exports = GameView;
