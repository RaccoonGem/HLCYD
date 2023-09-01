import GamePiece from './GamePiece.js';
import game from '../game.js';

let Player = function (controls) {
  GamePiece.call(this);
  this.x = 320;
  this.y = 360;
  this.size = 24;
  this.controls = controls;
}
Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.update = function () {
  this.speed = this.controls[" "] ? 1.5 : 3;
  if ((!this.controls.ArrowRight && !this.controls.ArrowLeft && !this.controls.ArrowUp && !this.controls.ArrowDown)
    || (this.controls.ArrowRight && this.controls.ArrowLeft || this.controls.ArrowUp && this.controls.ArrowDown)) {
    this.speed = 0;
  } else {
    this.direction = game.calcAngle({x: 0, y: 0}, {
      x: (this.controls.ArrowRight ? 1 : this.controls.ArrowLeft ? -1 : 0),
      y: (this.controls.ArrowDown ? 1 : this.controls.ArrowUp ? -1 : 0)
    });
  }
  if (this.x + (Math.cos(this.direction) * this.speed) > 640
  || this.x + (Math.cos(this.direction) * this.speed) < 0
  || this.y + (Math.sin(this.direction) * this.speed) > 480
  || this.y + (Math.sin(this.direction) * this.speed) < 0) {
    this.speed = 0;
  }
  this.posUpdate();
}
Player.prototype.draw = function (ctx) {
  ctx.fillStyle = '#00FF00';
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

export default Player;