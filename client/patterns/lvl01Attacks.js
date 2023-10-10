import Bullet from '../objects/projectiles/Bullet.js';
import Booster from '../objects/projectiles/Booster.js';
import Rocket from '../objects/projectiles/Rocket.js';
import Seeker from '../objects/projectiles/Seeker.js';
import game from '../game.js';

let attacks = [
  [{ // 360 even rocket spread (more rockets as time passes)
    moves: (E, P) => {
      let progress = 4 + Math.floor(Math.sqrt(game.time / 40));
      for (let f = Math.random(); f < progress; f++) {
        let bullet = new Rocket().setPosition(E.x, E.y)
        .setDirection(2 * f * Math.PI / progress)
        .setTimeOut(game.time + 150);
        game.pieces.push(bullet);
      }
    }, cd: 60
  }], [{ // 3-rocket spread
    moves: (E, P) => {
      for (let f = -1; f < 2; f++) {
        let bullet = new Rocket().setPosition(E.x, E.y)
        .setDirection(game.calcAngle(E, P) + (f * Math.PI / 8))
        .setTimeOut(game.time + 120);
        game.pieces.push(bullet);
      }
    }, cd: 90
  }], [{ // 6-round burst of rockets
    moves: (E, P) => {
      let bullet = new Rocket().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Rocket().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Rocket().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Rocket().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Rocket().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 10
  }, {
    moves: (E, P) => {
      let bullet = new Rocket().setPosition(E.x, E.y)
      .setDirection(game.calcAngle(E, P))
      .setTimeOut(game.time + 120);
      game.pieces.push(bullet);
    }, cd: 60
  }], [{ // fire a booster
    moves: (E, P) => {
      let bullet = new Booster(E.x, E.y, 24, 1, game.calcAngle(E, P), game.time + 240);
      game.pieces.push(bullet);
    }, cd: 45
  }], [{ // fire a seeker
    moves: (E, P) => {
      let bullet = new Seeker(E.x, E.y, 16, 0, game.calcAngle(E, P), game.time + 240);
      game.pieces.push(bullet);
    }, cd: 45
  }]
];
export default attacks;