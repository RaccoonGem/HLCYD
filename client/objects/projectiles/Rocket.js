import Bullet from './Bullet.js';

let Rocket = function (x, y, size, speed, direction, timeOut) {
  Bullet.call(this, x, y, size, speed, direction, timeOut);
}
Rocket.prototype = Object.create(Bullet.prototype);
Rocket.prototype.update = function () {
  this.vel.spd += 0.2;
  this.posUpdate();
}
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
}

export default Rocket;