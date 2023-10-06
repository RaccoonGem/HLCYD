import game from '../game.js';

let movements = [
  (E, P) => {
    let nextX = (Math.cos(E.vel.dir) * E.vel.spd) + E.x;
    let nextY = (Math.sin(E.vel.dir) * E.vel.spd) + E.y;
    if (nextX > 628 || nextX < 12) {
      E.vel.dir = game.calcAngle(E, {x: E.x - (nextX - E.x), y: nextY});
    }
    nextX = (Math.cos(E.vel.dir) * E.vel.spd) + E.x;
    nextY = (Math.sin(E.vel.dir) * E.vel.spd) + E.y;
    if (nextY > 468 || nextY < 12) {
      E.vel.dir = game.calcAngle(E, {x: nextX, y: E.y - (nextY - E.y)});
    }
  },
  (E, P) => {
    E.vel.dir += 1 / 180 * Math.PI;
    let nextX = (Math.cos(E.vel.dir) * E.vel.spd) + E.x;
    let nextY = (Math.sin(E.vel.dir) * E.vel.spd) + E.y;
    if (nextX > 628 || nextX < 12) {
      E.vel.dir = game.calcAngle(E, {x: E.x - (nextX - E.x), y: nextY});
    }
    nextX = (Math.cos(E.vel.dir) * E.vel.spd) + E.x;
    nextY = (Math.sin(E.vel.dir) * E.vel.spd) + E.y;
    if (nextY > 468 || nextY < 12) {
      E.vel.dir = game.calcAngle(E, {x: nextX, y: E.y - (nextY - E.y)});
    }
  },
  (E, P) => {
    E.x = ((3 * E.x) + E.targetX) / 4;
    E.y = ((3 * E.y) + E.targetY) / 4;
  }
];

export default movements;