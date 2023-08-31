import Bullet from '../objects/Bullet.js';
import Enemy from '../objects/Enemy.js';
import game from '../game.js';
let attacks01 = [
  [
    {
      moves: () => {
        game.enemy.direction = 0;
        game.enemy.speed = 0;
        game.enemy.cMovement = 1;
        game.enemy.targetX = (Math.floor(Math.random() * 3) * 160) + 160;
        game.enemy.targetY = (Math.floor(Math.random() * 2) * 160) + 160;
      },
      cd: 40
    }
  ],
  [
    {
      moves: () => {
        game.enemy.direction = Math.floor(Math.random() * 360);
        game.enemy.speed = 1;
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
  ]
];
export default attacks01;