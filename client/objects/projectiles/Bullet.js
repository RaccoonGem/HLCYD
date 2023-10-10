import GamePiece from '../GamePiece.js';

let Bullet = function () {
  GamePiece.call(this);
  this.x = 0;
  this.y = 0;
  this.size = 12;
  this.vel.spd = 5;
  this.vel.dir = 0;
  this.timeOut = 0;
  this.color = '#FF0000';
  this.deadly = true;
};
Bullet.prototype = Object.create(GamePiece.prototype);
Bullet.prototype.update = function () {
  this.posUpdate();
};
Bullet.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  ctx.fill();
};
Bullet.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
  return this;
};
Bullet.prototype.setSize = function (size) {
  this.size = size;
  return this;
};
Bullet.prototype.setSpeed = function (speed) {
  this.vel.spd = speed;
  return this;
};
Bullet.prototype.setDirection = function (direction) {
  this.vel.dir = direction;
  return this;
};
Bullet.prototype.setTimeOut = function (timeOut) {
  this.timeOut = timeOut;
  return this;
};
Bullet.prototype.setColor = function (color) {
  this.color = color;
  return this;
}

export default Bullet;