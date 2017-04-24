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

    this.game = new Game([posX, posY], this);

    window.walls = this.walls;
  }

  draw(ctx) {
    this.game.draw(ctx);
    //Draw walls
  }
}

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
    this.posX += position[0] * Game.SPEED;
    this.posY += position[1] * Game.SPEED;
  }

  draw(ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.posX, this.posY, 5, 5);
  }
}

Game.SPEED = 2;

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map