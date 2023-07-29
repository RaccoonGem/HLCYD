import GamePiece from './GamePiece.js';
import Bullet from './Bullet.js';

let Enemy = function (attacks) {
  GamePiece.call(this);
  this.x = 320;
  this.y = 120;
  this.speed = 1;
  this.size = 32;
  this.color = '#FF0000';
  this.nextTime = 120;
}
Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.update = function () {
  this.direction += 1 / 180 * Math.PI;
  this.posUpdate();
  //this.time++;
}
Enemy.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

export default Enemy;