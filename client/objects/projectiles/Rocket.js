import Bullet from './Bullet.js';

let Rocket = function () {
  Bullet.call(this);
  this.size = 16;
  this.vel.spd = 0;
  this.accel = 0.2;
};
Rocket.prototype = Object.create(Bullet.prototype);
Rocket.prototype.update = function () {
  this.vel.spd += this.accel;
  this.posUpdate();
};
Rocket.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.translate(this.x, this.y);
  ctx.rotate(this.vel.dir);
  ctx.beginPath();
  ctx.moveTo(this.size / 2, 0);
  ctx.lineTo(this.size / -2, this.size / 2);
  ctx.lineTo(this.size / -2, this.size / -2);
  ctx.lineTo(this.size / 2, 0);
  ctx.fill();
  ctx.resetTransform();
};
Rocket.prototype.setAcceleration = function (acceleration) {
  this.accel = acceleration;
  return this;
}

export default Rocket;