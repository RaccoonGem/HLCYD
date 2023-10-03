import Bullet from '../objects/projectiles/Bullet.js';
import Burr from '../objects/projectiles/Burr.js';
import Bubble from '../objects/projectiles/Bubble.js';
import game from '../game.js';

let attacks = [
  [{ // fire a burr
    moves: (E, P) => {
      let bullet = new Burr(E.x, E.y, 36, 6, 0.075, game.calcAngle(E, P), game.time + 240);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 45
  }], [{ // 3-bubble spread
    moves: (E, P) => {
      for (let f = -1; f < 2; f++) {
        let bullet = new Bubble(E.x, E.y, 12, 4, 0.1, game.calcAngle(E, P) + (f * Math.PI / 8), game.time + 120);
        game.pieces.push(bullet);
      }
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 90
  }], [{ // 3-bullet spread
    moves: (E, P) => {
      for (let f = -1; f < 2; f++) {
        let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P) + (f * Math.PI / 8), game.time + 120);
        game.pieces.push(bullet);
      }
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 90
  }], [{ // multiple speeds of bullet fired in a line
    moves: (E, P) => {
      for (let f = 1; f < 17; f++) {
        let bullet = new Bullet(E.x, E.y, 20 - f, f / 4, game.calcAngle(E, P), game.time + 180);
        game.pieces.push(bullet);
      }
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 90
  }], [{ // 360 even bullet spread (more bullets as time passes)
    moves: (E, P) => {
      let progress = 4 + Math.floor(Math.sqrt(game.time / 40));
      for (let f = Math.random(); f < progress; f++) {
        let bullet = new Bullet(E.x, E.y, 12, 4, 2 * f * Math.PI / progress, game.time + 150);
        game.pieces.push(bullet);
      }
    }, cd: 60
  }], [{ // Stop / reset position, 360 bullet / burr spread
    moves: (E, P) => {
      E.cMovement = 0;
    }, cd: 30
  }, {
    moves: (E, P) => {
      let progress = 4 + Math.floor(Math.sqrt(game.time / 40));
      for (let f = Math.random(); f < progress; f++) {
        let bullet = new Bullet(E.x, E.y, 12, 5, 2 * f * Math.PI / progress, game.time + 240);
        game.pieces.push(bullet);
        bullet = new Burr(E.x, E.y, 24, 5, 0.05, 2 * (f + 0.5) * Math.PI / progress, game.time + 240);
        game.pieces.push(bullet);
      }
    }, cd: 60
  }], [{ // 6-round burst of bullets
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.2, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.2, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.2, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.2, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.2, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet(E.x, E.y, 12, 5, game.calcAngle(E, P), game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.2, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 60
  }], [{ // bubbles at random horizontal speeds
    moves: (E, P) => {
      E.cMovement = 0;
    }, cd: 30
  }, {
    moves: (E, P) => {
      let progress = 4 + Math.floor(Math.sqrt(game.time / 60));
      for (let f = 0; f < progress; f++) {
        let bullet = new Bubble(E.x, E.y, 10 + (Math.random() * 6), (Math.random() * 8) - 4, 0.05 + (Math.random() / 10), 0, game.time + 180);
        game.pieces.push(bullet);
      }
    }, cd: 90
  }], [{ // 6 falling bubbles
    moves: (E, P) => {
      let bullet = new Bubble((Math.random() * 616) + 12, 1, 48, 0, 0.2, 0, game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble((Math.random() * 616) + 12, 1, 48, 0, 0.2, 0, game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble((Math.random() * 616) + 12, 1, 48, 0, 0.2, 0, game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble((Math.random() * 616) + 12, 1, 48, 0, 0.2, 0, game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble((Math.random() * 616) + 12, 1, 48, 0, 0.2, 0, game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble((Math.random() * 616) + 12, 1, 48, 0, 0.2, 0, game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }]
];
export default attacks;