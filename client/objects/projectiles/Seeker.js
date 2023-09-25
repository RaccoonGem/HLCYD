import Bullet from './Bullet.js';
import game from '../../game.js';

let Seeker = function (x, y, size, speed, direction, timeOut) {
  Bullet.call(this, x, y, size, speed, direction, timeOut);
};
Seeker.prototype = Object.create(Bullet.prototype);
Seeker.prototype.update = function () {
  this.vel = game.addVector(this.vel, {spd: 0.2, dir: game.calcAngle(this, game.player)});
  this.posUpdate();
};
Seeker.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.translate(this.x, this.y);
  ctx.rotate(game.calcAngle(this, game.player));
  ctx.beginPath();
  ctx.moveTo(this.size / 2, 0);
  ctx.lineTo(0, this.size / 2);
  ctx.lineTo(0, this.size / 4);
  ctx.lineTo(this.size / -2, 0)
  ctx.lineTo(0, this.size / -4);
  ctx.lineTo(0, this.size / -2);
  ctx.lineTo(this.size / 2, 0);
  ctx.fill();
  ctx.resetTransform();
};

export default Seeker;