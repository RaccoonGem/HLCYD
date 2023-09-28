import game from '../game.js';

let movements = [
  (E, P) => {
    if (game.calcDistance(E, P) > 240) {
      E.vel = game.addVector(E.vel, {spd: 0.1, dir: game.calcAngle(E, P)});
    } else if (game.calcDistance(E, P) < 160) {
      E.vel.spd *= 0.95;
    }
    if (E.x < 0 || E.x > 640 || E.y < 0 || E.y > 480) {
      E.vel.spd *= 0.75;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, {x: 320, y: 240})});
    }
  }
];

export default movements;