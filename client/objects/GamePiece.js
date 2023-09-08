import game from '../game.js';
let GamePiece = function () {
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.vel = {
    spd: 0,
    dir: 0
  };
  this.deadly = false;
}
GamePiece.prototype.posUpdate = function () {
  this.x += Math.cos(this.vel.dir) * this.vel.spd;
  this.y += Math.sin(this.vel.dir) * this.vel.spd;
}
GamePiece.prototype.collision = function () {
  return Math.sqrt(((this.x - game.player.x) ** 2) + ((this.y - game.player.y) ** 2)) < (this.size + game.player.size) / 2;
}
GamePiece.prototype.draw = function (ctx) {

}

export default GamePiece;