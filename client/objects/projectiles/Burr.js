import Bullet from './Bullet.js';

let Burr = function (x, y, size, speed, deceleration, direction, timeOut) {
  Bullet.call(this, x, y, size, speed, direction, timeOut);
  this.decel = deceleration;
};
Burr.prototype = Object.create(Bullet.prototype);
Burr.prototype.update = function () {
  this.vel.spd -= this.decel;
  if (this.vel.spd < 0) {
    this.vel.spd = 0;
  }
  this.posUpdate();
};
Burr.prototype.draw = function (ctx) {
  let sideLength = this.size / (2 ** 0.5);
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x - (sideLength / 2), this.y - (sideLength / 2), sideLength, sideLength);
  ctx.translate(this.x, this.y);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect((sideLength / -2), (sideLength / -2), sideLength, sideLength);
  ctx.resetTransform();
};

export default Burr;