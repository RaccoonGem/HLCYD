import GamePiece from './GamePiece.js';
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

  this.cAttack = 0;
  this.action = 0;
  this.cDraw = 0;
  this.cMovement = 0;
};
Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.init = function () {
  import('../patterns/lvl' + (game.level < 10 ? '0' : '') + game.level + 'Attacks.js').then((a) => {
    this.attacks = a.default;
    this.cAttack = Math.floor(Math.random() * this.attacks.length);
    import('../patterns/lvl' + (game.level < 10 ? '0' : '') + game.level + 'Draws.js').then((d) => {
      this.draws = d.default;
      import('../patterns/lvl' + (game.level < 10 ? '0' : '') + game.level + 'Movements.js').then((m) => {
        this.movements = m.default;
        game.state = 'dodging';
      });
    });
  });
};
Enemy.prototype.update = function () {
  if (game.time >= this.nextTime) {
    this.attacks[this.cAttack][this.action].moves(this, game.player);
    this.nextTime += this.attacks[this.cAttack][this.action].cd;
    this.action++;
    if (this.action >= this.attacks[this.cAttack].length) {
      this.action = 0;
      this.cAttack = Math.floor(Math.random() * this.attacks.length);
    }
  }
  this.movements[this.cMovement](this, game.player);
  this.posUpdate();
};
Enemy.prototype.draw = function (ctx) {
  this.draws[this.cDraw](ctx, this, game.player);
};

export default Enemy;