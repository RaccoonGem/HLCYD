//import Bullet from '../objects/Bullet.js';
let attacks01 = [
  [
    {
      moves: () => {
        enemy.direction = 0;
        enemy.speed = 0;
        cMovement = 1;
        enemy.targetX = (Math.floor(Math.random() * 3) * 160) + 160;
        enemy.targetY = (Math.floor(Math.random() * 2) * 160) + 160;
      },
      cd: 40
    }
  ],
  [
    {
      moves: () => {
        enemy.direction = Math.floor(Math.random() * 360);
        enemy.speed = 1;
        cMovement = 0;
      },
      cd: 20
    }
  ],
  [
    {
      moves: () => {
        let progress = 4 + Math.floor(Math.sqrt(time / 40));
        for (let f = Math.random(); f < progress; f++) {
          let bullet = new Bullet(enemy.x, enemy.y, 12, 4, 2 * f * Math.PI / progress, time + 150);
          gamePieces.push(bullet);
        }
      },
      cd: 60
    }
  ],
  [
    {
      moves: () => {
        for (let f = -1; f < 2; f++) {
          let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player) + (f * Math.PI / 8), time + 120);
          gamePieces.push(bullet);
        }
      },
      cd: 90
    }
  ],
  [
    {
      moves: () => {
        for (let f = 1; f < 17; f++) {
          let bullet = new Bullet(enemy.x, enemy.y, 20 - f, f / 4, calcAngle(enemy, player), time + 180);
          gamePieces.push(bullet);
        }
      },
      cd: 90
    }
  ],
  [
    {
      moves: () => {
        let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player), time + 120);
        gamePieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player), time + 120);
        gamePieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player), time + 120);
        gamePieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player), time + 120);
        gamePieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player), time + 120);
        gamePieces.push(bullet);
      },
      cd: 10
    },
    {
      moves: () => {
        let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player), time + 120);
        gamePieces.push(bullet);
      },
      cd: 60
    }
  ]
];
//export default attacks01;