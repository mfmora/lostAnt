class Wave {
  constructor(origin, direction, map) {
    this.origin = origin;
    this.direction = direction;
    this.map = map;
    this.age = 0;
  }

  draw(ctx) {
    
  }
}

Wave.SPEED = 3;
Wave.WIDE = 1;
Wave.MAX_AGE = 100;

module.exports = Wave;
