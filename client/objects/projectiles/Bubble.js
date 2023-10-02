import Bullet from './Bullet.js';
import game from '../../game.js';

let Bubble = function (x, y, size, speed, acceleration, direction, timeOut) {
  Bullet.call(this, x, y, size, speed, direction, timeOut);
  this.accel = acceleration;
};
Bubble.prototype = Object.create(Bullet.prototype);
Bubble.prototype.update = function () {
  this.vel = game.addVector(this.vel, {spd: this.accel, dir: Math.PI / 2});
  this.posUpdate();
};
Bubble.prototype.draw = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.accel * 10;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  ctx.stroke();
};

export default Bubble;