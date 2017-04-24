/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1)

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const gameEl = document.getElementsByClassName("game")[0];

  //Set height and width of canvas based on the game window size
  canvasEl.width = gameEl.offsetWidth;
  canvasEl.height = gameEl.offsetHeight;

  const ctx = canvasEl.getContext("2d");

  document.getElementById("start-button").addEventListener("click", startGame);
});

let level = 1;

function startGame() {
  //Hide all elements with class "game"
  const messages = document.getElementsByClassName("game");
  for(let message of messages) {
    message.classList.toggle('hidden');
  }

  //Unhide canvas
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.classList.toggle('hidden');

  const gameView = new GameView(canvasEl, level);
  gameView.start();
  // new GameView(game, ctx).start();
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Map = __webpack_require__(2);

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

    this.ctx.fillStyle = "#191919";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.map.draw(this.ctx);

    requestAnimationFrame(this.move.bind(this));
  }

  totalMovement() {
    let total = [0, 0];
    if (GameView.KEYS[37]) total[0] -= 1 ;
    if (GameView.KEYS[38]) total[1] -= 1 ;
    if (GameView.KEYS[39]) total[0] += 1 ;
    if (GameView.KEYS[40]) total[1] += 1 ;

    // console.log(total);
    this.game.move(total);
  }

}

GameView.KEYS = {};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const LevelInfo = __webpack_require__(4);
const Game = __webpack_require__(5);
const Wall = __webpack_require__(6);
const Waves = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./waves\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

class Map {
  constructor(canvas, level) {
    this.canvas = canvas;
    this.waves = [];
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
    //Draw waves

  }

  validMove(position) {

    //Check that it's not outside the borders
    if((position[0] < 0) || (position[0] > this.canvas.width - 20)) return false;
    if((position[1] < 0) || (position[1] > this.canvas.height - 20)) return false;

    //Check if there is a wall
    let noWall = true;
    this.walls.forEach(wall => {
      if(wall.inWall(position)) {
        noWall = false;
      }
    });

    return noWall;
  }
}

Map.WAVE = [
  [0,1],
  [0,-1],
  [1,0],
  [-1,0]
];

module.exports = Map;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  LEVELS : {
    1: {
      walls: [
        [0, 0, 0.01, 1],
        [0, 0.35, 0.75, 0.4],
        [0, 0.6, 0.6, 0.65],
        [0.7, 0.35, 0.75, 1],
        [0.55, 0.65, 0.6, 1]
      ],
      start: {x: .05, y: .47},
    }
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map