import game from '../game.js';

let movements = [
  (E, P) => {
    E.vel.dir += 1 / 180 * Math.PI;
  },
  (E, P) => {
    E.x = ((3 * E.x) + E.targetX) / 4;
    E.y = ((3 * E.y) + E.targetY) / 4;
  }
];

export default movements;