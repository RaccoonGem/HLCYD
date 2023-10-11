import Rocket from './Rocket.js';
import game from '../../game.js';

let Booster = function () {
  Rocket.call(this);
  this.size = 24;
};
Booster.prototype = Object.create(Rocket.prototype);
Booster.prototype.update = function () {
  this.vel = game.addVector(this.vel, {spd: this.accel, dir: Math.round(game.calcAngle(this, game.player) / (Math.PI / 2)) * (Math.PI / 2)});
  this.posUpdate();
};
Booster.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  for (let f = 0; f < 4; f++) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, f * Math.PI / 2, (f + 1) * Math.PI / 2);
    ctx.fill();
  }
  let boostDir = Math.round(game.calcAngle(this, game.player) / (Math.PI / 2)) * (Math.PI / 2);
  ctx.beginPath();
  ctx.moveTo(this.x + (Math.cos(boostDir) * this.size / 4), this.y + (Math.sin(boostDir) * this.size / 4));
  ctx.arc(this.x + (Math.cos(boostDir) * this.size / 4), this.y + (Math.sin(boostDir) * this.size / 4), this.size / 8, 0, Math.PI * 2);
  ctx.fill();
};

export default Booster;