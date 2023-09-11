import GamePiece from '../GamePiece.js';

let Bullet = function (x, y, size, speed, direction, timeOut) {
  GamePiece.call(this);
  this.x = x;
  this.y = y;
  this.size = size;
  this.vel.spd = speed;
  this.vel.dir = direction;
  this.timeOut = timeOut;
  this.color = '#FF0000';
  this.deadly = true;
}
Bullet.prototype = Object.create(GamePiece.prototype);
Bullet.prototype.update = function () {
  this.posUpdate();
}
Bullet.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

export default Bullet;