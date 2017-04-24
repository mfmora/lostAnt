const Map = require("./map");

class GameView {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.level = level;
    this.ctx = canvas.getContext("2d");
    this.map = new Map(canvas, level);
    this.game = this.map.game;
  }

  bindKeyHandlers() {
    window.addEventListener("keydown", e => {
      GameView.KEYS[e.which] = true;
    });

    window.addEventListener("keyup", e => {
      GameView.KEYS[e.which] = false;
    });
  }

  start() {
    this.bindKeyHandlers();
    this.totalMovement();

    requestAnimationFrame(this.move.bind(this));
  }

  move() {
    this.totalMovement();
    this.map.draw(this.ctx);

    requestAnimationFrame(this.move.bind(this));
  }

  totalMovement() {
    let total = [0, 0];
    if (GameView.KEYS[37]) total[0] -= 1 ;
    if (GameView.KEYS[38]) total[1] += 1 ;
    if (GameView.KEYS[39]) total[0] += 1 ;
    if (GameView.KEYS[40]) total[1] -= 1 ;

    // console.log(total);
    this.game.move(total);
  }

}

GameView.KEYS = {};

module.exports = GameView;
