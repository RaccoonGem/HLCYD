import Bullet from '../objects/projectiles/Bullet.js';
import Burr from '../objects/projectiles/Burr.js';
import Booster from '../objects/projectiles/Booster.js';
import Rocket from '../objects/projectiles/Rocket.js';
import game from '../game.js';

let attacks01 = [
  [
    {
      moves: () => {
        const E = game.enemy;
        E.vel.dir = 0;
        E.vel.spd = 0;
        E.cMovement = 1;
        E.targetX = (Math.floor(Math.random() * 3) * 160) + 160;
        E.targetY = (Math.floor(Math.random() * 2) * 160) + 160;
      },
      cd: 40
    }
  ],
  [
    {
      moves: () => {
        game.enemy.vel.dir = Math.floor(Math.random() * 360);
        game.enemy.vel.spd = 1;
        game.enemy.cMovement = 0;
      },
      cd: 20
    }
  ],
  [
    {
      moves: () => {
        let progress = 4 + Math.floor(Math.sqrt(game.time / 40));
        for (let f = Math.random(); f < progress; f++) {
          let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 4, 2 * f * Math.PI / progress, game.time + 150);
          game.pieces.push(bullet);
        }
      },
      cd: 60
    }
  ],
  [
    {
      moves: () => {
        for (let f = -1; f < 2; f++) {
          let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 5, game.calcAngle(game.enemy, game.player) + (f * Math.PI / 8), game.time + 120);
          game.pieces.push(bullet);
        }
      },
      cd: 90
    }
  ],
  [
    {
      moves: () => {
        for (let f = 1; f < 17; f++) {
          let bullet = new Bullet(game.enemy.x, game.enemy.y, 20 - f, f / 4, game.calcAngle(game.enemy, game.player), game.time + 180);
          game.pieces.push(bullet);
        }
      },
      cd: 90
    }
  ],
  [
    {
      moves: () => {
        let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 5, game.calcAngle(game.enemy, game.player), game.time + 120);
        game.pieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 5, game.calcAngle(game.enemy, game.player), game.time + 120);
        game.pieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 5, game.calcAngle(game.enemy, game.player), game.time + 120);
        game.pieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 5, game.calcAngle(game.enemy, game.player), game.time + 120);
        game.pieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 5, game.calcAngle(game.enemy, game.player), game.time + 120);
        game.pieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(game.enemy.x, game.enemy.y, 12, 5, game.calcAngle(game.enemy, game.player), game.time + 120);
        game.pieces.push(bullet);
      },
      cd: 60
    }
  ],
  [
    {
      moves: () => {
        let bullet = new Burr(game.enemy.x, game.enemy.y, 36, 5, game.calcAngle(game.enemy, game.player), game.time + 240);
        game.pieces.push(bullet);
      },
      cd: 45
    }
  ],
  [
    {
      moves: () => {
        let bullet = new Booster(game.enemy.x, game.enemy.y, 24, 1, game.calcAngle(game.enemy, game.player), game.time + 240);
        game.pieces.push(bullet);
      },
      cd: 45
    }
  ],
  [
    {
      moves: () => {
        let bullet = new Rocket(game.enemy.x, game.enemy.y, 16, 0, game.calcAngle(game.enemy, game.player), game.time + 240);
        game.pieces.push(bullet);
      },
      cd: 45
    }
  ]
];
export default attacks01;