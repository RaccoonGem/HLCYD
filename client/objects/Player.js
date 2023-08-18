import GamePiece from './GamePiece.js';

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
  if (this.controls.ArrowRight) {
    if (this.controls.ArrowUp) {
      this.direction = Math.PI * 7 / 4;
    } else if (this.controls.ArrowDown) {
      this.direction = Math.PI / 4;
    } else {
      this.direction = 0;
    }
  } else if (this.controls.ArrowLeft) {
    if (this.controls.ArrowUp) {
      this.direction = Math.PI * 5 / 4;
    } else if (this.controls.ArrowDown) {
      this.direction = Math.PI * 3 / 4;
    } else {
      this.direction = Math.PI;
    }
  } else if (this.controls.ArrowUp) {
    this.direction = Math.PI * 3 / 2;
  } else if (this.controls.ArrowDown) {
    this.direction = Math.PI / 2;
  } else {
    this.speed = 0;
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