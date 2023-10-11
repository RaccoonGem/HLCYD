import Bullet from '../objects/projectiles/Bullet.js';
import Burr from '../objects/projectiles/Burr.js';
import Bubble from '../objects/projectiles/Bubble.js';
import game from '../game.js';

let attacks = [
  [{ // fire a burr
    moves: (E, P) => {
      let bullet = new Burr().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 240);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 45
  }], [{ // 3-bubble spread
    moves: (E, P) => {
      for (let f = -1; f < 2; f++) {
        let bullet = new Bubble().setPosition(E.x, E.y)
        .setSpeed(4)
        .setDirection(game.calcAngle(E, P) + (f * Math.PI / 8))
        .setTimeOut(game.time + 120);
        game.pieces.push(bullet);
      }
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 90
  }], [{ // 3-bullet spread
    moves: (E, P) => {
      for (let f = -1; f < 2; f++) {
        let bullet = new Bullet().setPosition(E.x, E.y)
        .setDirection(game.calcAngle(E, P) + (f * Math.PI / 8))
        .setTimeOut(game.time + 120);
        game.pieces.push(bullet);
      }
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 90
  }], [{ // multiple speeds of bullet fired in a line
    moves: (E, P) => {
      for (let f = 1; f < 17; f++) {
        let bullet = new Bullet().setPosition(E.x, E.y)
        .setSize(20 - f)
        .setSpeed(f / 4)
        .setDirection(game.calcAngle(E, P))
        .setTimeOut(game.time + 180);
        game.pieces.push(bullet);
      }
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 1, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 90
  }], [{ // 360 even bullet spread (more bullets as time passes)
    moves: (E, P) => {
      let progress = 4 + Math.floor(Math.sqrt(game.time / 40));
      for (let f = Math.random(); f < progress; f++) {
        let bullet = new Bullet().setPosition(E.x, E.y)
        .setSpeed(4)
        .setDirection(2 * f * Math.PI / progress)
        .setTimeOut(game.time + 150);
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
        let bullet = new Bullet().setPosition(E.x, E.y)
        .setDirection(2 * f * Math.PI / progress)
        .setTimeOut(game.time + 240);
        game.pieces.push(bullet);
        bullet = new Burr().setPosition(E.x, E.y)
        .setSize(24)
        .setSpeed(5)
        .setDeceleration(0.05)
        .setDirection(2 * (f + 0.5) * Math.PI / progress)
        .setTimeOut(game.time + 240);
        game.pieces.push(bullet);
      }
    }, cd: 60
  }], [{ // 6-round burst of bullets
    moves: (E, P) => {
      let bullet = new Bullet().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.4, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.4, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.4, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.4, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.4, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bullet().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
      E.cMovement = 1;
      E.vel = game.addVector(E.vel, {spd: 0.4, dir: game.calcAngle(E, P) + Math.PI});
    }, cd: 60
  }], [{ // bubbles at random horizontal speeds
    moves: (E, P) => {
      E.cMovement = 0;
    }, cd: 30
  }, {
    moves: (E, P) => {
      let progress = 4 + Math.floor(Math.sqrt(game.time / 60));
      for (let f = 0; f < progress; f++) {
        let bullet = new Bubble().setPosition(E.x, E.y)
        .setSize(10 + (Math.random() * 6))
        .setSpeed((Math.random() * 8) - 4)
        .setAcceleration(0.05 + (Math.random() / 10))
        .setTimeOut(game.time + 180);
        game.pieces.push(bullet);
      }
    }, cd: 90
  }], [{ // 6 falling bubbles
    moves: (E, P) => {
      let bullet = new Bubble().setPosition((Math.random() * 616) + 12, 1)
      .setSize(48)
      .setAcceleration(0.2)
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble().setPosition((Math.random() * 616) + 12, 1)
      .setSize(48)
      .setAcceleration(0.2)
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble().setPosition((Math.random() * 616) + 12, 1)
      .setSize(48)
      .setAcceleration(0.2)
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble().setPosition((Math.random() * 616) + 12, 1)
      .setSize(48)
      .setAcceleration(0.2)
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble().setPosition((Math.random() * 616) + 12, 1)
      .setSize(48)
      .setAcceleration(0.2)
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Bubble().setPosition((Math.random() * 616) + 12, 1)
      .setSize(48)
      .setAcceleration(0.2)
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }]
];
export default attacks;