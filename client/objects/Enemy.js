import GamePiece from './GamePiece.js';
import Bullet from './Bullet.js';

let Enemy = function () {
  GamePiece.call(this);
  this.x = 320;
  this.y = 120;
  this.speed = 1;
  this.size = 32;
  this.color = '#FF0000';
  this.nextTime = 120;
  this.targetX = 320;
  this.targetY = 120;
}
Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.update = function () {
  this.posUpdate();
}
Enemy.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

export default Enemy;