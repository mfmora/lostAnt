
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const gameEl = document.getElementsByClassName("game")[0];

  //Set height and width of canvas based on the game window size
  canvasEl.width = gameEl.offsetWidth;
  canvasEl.height = gameEl.offsetHeight;

  const ctx = canvasEl.getContext("2d");

  document.getElementById("start-button").addEventListener("click", startGame);
});

function startGame() {
  console.log("this is working");
}
