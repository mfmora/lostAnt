const GameView = require("./game_view")

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
