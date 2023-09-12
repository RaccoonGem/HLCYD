import Bullet from './Bullet.js';
import game from '../../game.js';

let Booster = function (x, y, size, speed, direction, timeOut) {
  Bullet.call(this, x, y, size, speed, direction, timeOut);
}
Booster.prototype = Object.create(Bullet.prototype);
Booster.prototype.update = function () {
  this.vel = game.addVector(this.vel, {spd: 0.1, dir: game.calcAngle({x: 0, y: 0}, {x: 0, y: game.player.y - this.y})});
  this.vel = game.addVector(this.vel, {spd: 0.1, dir: game.calcAngle({x: 0, y: 0}, {x: game.player.x - this.x, y: 0})});
  this.posUpdate();
}
Booster.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  for (let f = 0; f < 4; f++) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, f * Math.PI / 2, (f + 1) * Math.PI / 2);
    ctx.fill();
  }
}

export default Booster;