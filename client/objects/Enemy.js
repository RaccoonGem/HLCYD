import GamePiece from './GamePiece.js';
import attacks01 from '../patterns/lvl01Attacks.js';
import draws01 from '../patterns/lvl01Draws.js';
import movements01 from '../patterns/lvl01Movements.js';
import game from '../game.js';

let Enemy = function () {
  GamePiece.call(this);
  this.x = 320;
  this.y = 120;
  this.vel.spd = 1;
  this.size = 32;
  this.color = '#FF0000';
  this.nextTime = 120;
  this.targetX = 320;
  this.targetY = 120;

  this.attacks = attacks01;
  this.cAttack = 0;
  this.action = 0;
  this.draws = draws01;
  this.cDraw = 0;
  this.movements = movements01;
  this.cMovement = 0;
}
Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.update = function () {
  if (game.time >= this.nextTime) {
    this.attacks[this.cAttack][this.action].moves();
    this.nextTime += this.attacks[this.cAttack][this.action].cd;
    this.action++;
    if (this.action >= this.attacks[this.cAttack].length) {
      this.action = 0;
      this.cAttack = Math.floor(Math.random() * this.attacks.length);
    }
  }
  this.movements[this.cMovement]();
  this.posUpdate();
}
Enemy.prototype.draw = function (ctx) {
  this.draws[this.cDraw](ctx);
}

export default Enemy;