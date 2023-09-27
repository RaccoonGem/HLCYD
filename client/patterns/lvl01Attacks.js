import Bullet from '../objects/projectiles/Bullet.js';
import Burr from '../objects/projectiles/Burr.js';
import Booster from '../objects/projectiles/Booster.js';
import Rocket from '../objects/projectiles/Rocket.js';
import Seeker from '../objects/projectiles/Seeker.js';
import Bubble from '../objects/projectiles/Bubble.js';
import game from '../game.js';

let attacks = [
  [{ // Movement 1, pick random target
    moves: (E, P) => {
      E.vel.dir = 0;
      E.vel.spd = 0;
      E.cMovement = 1;
      E.targetX = (Math.floor(Math.random() * 3) * 160) + 160;
      E.targetY = (Math.floor(Math.random() * 2) * 160) + 160;
    }, cd: 40
  }], [{ // Movement 0, pick random direction
    moves: (E, P) => {
      E.vel.dir = Math.floor(Math.random() * 360);
      E.vel.spd = 1;
      E.cMovement = 0;
    }, cd: 20
  }], [{ // 360 even bullet spread (more bullets as time passes)
    moves: (E, P) => {
      let progress = 4 + Math.floor(Math.sqrt(game.time / 40));
      for (let f = Math.random(); f < progress; f++) {
        let bullet = new Bullet(E.x, E.y, 12, 4, 2 * f * Math.PI / progress, game.time + 150);
        game.pieces.push(bullet);
      }
    }, cd: 60
  }], [{ // 3-bullet spread
    moves: (E, P) => {
      for (let f = -1; f < 2; f++) {
        let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P) + (f * Math.PI / 8), game.time + 120);
        game.pieces.push(bullet);
      }
    }, cd: 90
  }], [{ // multiple speeds of bullet fired in a line
    moves: (E, P) => {
      for (let f = 1; f < 17; f++) {
        let bullet = new Bullet(E.x, E.y, 20 - f, f / 4, game.calcAngle(E, P), game.time + 180);
        game.pieces.push(bullet);
      }
    }, cd: 90
  }], [{ // 6-round burst of bullets
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
    }, cd: 60
  }], [{ // fire a burr
    moves: (E, P) => {
      let bullet = new Burr(E.x, E.y, 36, 5, game.calcAngle(E, P), game.time + 240);
      game.pieces.push(bullet);
    }, cd: 45
  }], [{ // fire a booster
    moves: (E, P) => {
      let bullet = new Booster(E.x, E.y, 24, 1, game.calcAngle(E, P), game.time + 240);
      game.pieces.push(bullet);
    }, cd: 45
  }], [{ // fire a rocket
    moves: (E, P) => {
      let bullet = new Rocket(E.x, E.y, 16, 0, game.calcAngle(E, P), game.time + 240);
      game.pieces.push(bullet);
    }, cd: 45
  }], [{ // fire a seeker
    moves: (E, P) => {
      let bullet = new Seeker(E.x, E.y, 16, 0, game.calcAngle(E, P), game.time + 240);
      game.pieces.push(bullet);
    }, cd: 45
  }], [{ // 3-bubble spread
    moves: (E, P) => {
      for (let f = -1; f < 2; f++) {
        let bullet = new Bubble(E.x, E.y, 12, 5, game.calcAngle(E, P) + (f * Math.PI / 8), game.time + 120);
        game.pieces.push(bullet);
      }
    }, cd: 90
  }]
];
export default attacks;