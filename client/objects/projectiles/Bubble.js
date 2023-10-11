import Rocket from './Rocket.js';
import game from '../../game.js';

let Bubble = function () {
  Rocket.call(this);
  this.size = 12;
  this.accel = 0.1;
  this.fallDir = Math.PI / 2;
};
Bubble.prototype = Object.create(Rocket.prototype);
Bubble.prototype.update = function () {
  this.vel = game.addVector(this.vel, {spd: this.accel, dir: this.fallDir});
  this.posUpdate();
};
Bubble.prototype.draw = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.accel * 15;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  ctx.stroke();
};
Bubble.prototype.setFallDirection = function (fallDirection) {
  this.fallDir = fallDirection;
  return this;
};

export default Bubble;