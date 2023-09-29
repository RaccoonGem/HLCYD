import game from '../game.js';

let movements = [
  (E, P) => {
    E.vel.spd = 0;
    if (game.calcDistance(E, {x: 320, y: 120}) <= 1) {
      E.x = 320;
      E.y = 120;
    } else {
      E.x = (E.x + 320) / 2;
      E.y = (E.y + 120) / 2;
    }
  },
  (E, P) => {
    E.vel = game.addVector(E.vel, {spd: 0.05, dir: game.calcAngle(E, {x: 320, y: 120})});
  }
];

export default movements;