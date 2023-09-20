import game from '../game.js';

let movements = [
  () => {
    game.enemy.vel.dir += 1 / 180 * Math.PI;
  },
  () => {
    game.enemy.x = ((3 * game.enemy.x) + game.enemy.targetX) / 4;
    game.enemy.y = ((3 * game.enemy.y) + game.enemy.targetY) / 4;
  }
];

export default movements;