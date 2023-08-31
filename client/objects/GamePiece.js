import game from '../game.js';
let GamePiece = function () {
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.speed = 0;
  this.direction = 0;
}
GamePiece.prototype.posUpdate = function () {
  this.x += Math.cos(this.direction) * this.speed;
  this.y += Math.sin(this.direction) * this.speed;
}
GamePiece.prototype.draw = function (ctx) {

}

export default GamePiece;