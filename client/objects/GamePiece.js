import game from '../game.js';
let GamePiece = function () {
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.vel = {
    spd: 0,
    dir: 0
  };
  this.speed = 0;
  this.direction = 0;
}
GamePiece.prototype.posUpdate = function () {
  this.x += Math.cos(this.vel.dir) * this.vel.spd;
  this.y += Math.sin(this.vel.dir) * this.vel.spd;
}
GamePiece.prototype.draw = function (ctx) {

}

export default GamePiece;