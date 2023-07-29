import GamePiece from './objects/GamePiece.js';
import Player from './objects/Player.js';
import Enemy from './objects/Enemy.js';
import Bullet from './objects/Bullet.js';
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

// axios.get('/leaderboard')
//   .then(results => {
//     console.log(results.data);
//   });

const canvasBG = document.getElementById('bg');
const canvasMG = document.getElementById('mg');
const canvasFG = document.getElementById('fg');
const ctxBG = canvasBG.getContext('2d');
const ctxMG = canvasMG.getContext('2d');
const ctxFG = canvasFG.getContext('2d');

const player = new Player();
const enemy = new Enemy();
let gamePieces = [player, enemy];
let attacks = [() => {
  let progress = 4 + Math.floor(Math.sqrt(time / 40));
  for (let f = Math.random(); f < progress; f++) {
    let bullet = new Bullet(enemy.x, enemy.y, 12, 4, 2 * f * Math.PI / progress, time + 150);
    gamePieces.push(bullet);
  }
  enemy.nextTime += 60;
}, () => {
  for (let f = -1; f < 2; f++) {
    let bullet = new Bullet(enemy.x, enemy.y, 12, 5, calcAngle(enemy, player) + (f * Math.PI / 8), time + 120);
    gamePieces.push(bullet);
  }
  enemy.nextTime += 90;
}, () => {
  for (let f = 1; f < 17; f++) {
    let bullet = new Bullet(enemy.x, enemy.y, 20 - f, f / 4, calcAngle(enemy, player), time + 180);
    gamePieces.push(bullet);
  }
  enemy.nextTime += 90;
}];

let time = 0;
let gameState = 'dodging';

ctxBG.fillStyle = '#000000';
ctxBG.fillRect(0, 0, 640, 480);

let calcAngle = function (thisObj, thatObj) {
  if (thisObj.x === thatObj.x) {
    if (thisObj.y > thatObj.y) {
      return 3 * Math.PI / 2;
    } else {
      return Math.PI / 2;
    }
  } else {
    return Math.atan2(thatObj.y - thisObj.y, thatObj.x - thisObj.x);
  }
}

let step = function() {
  ctxMG.clearRect(0, 0, 640, 480);
  if (gameState === 'dodging') {
    ctxMG.fillStyle = '#FFFFFF';
    ctxMG.font = '16px monospace';
    ctxMG.textAlign = 'center';
    ctxMG.fillText((time / 60).toFixed(2), 320, 16);
    time++;
    if (time === enemy.nextTime) {
      attacks[Math.floor(Math.random() * attacks.length)]();
    }
    for (let f = 0; f < gamePieces.length; f++) {
      gamePieces[f].update();
      gamePieces[f].draw(ctxMG);
    }

    for (let f = 2; f < gamePieces.length; f++) {
      if (Math.sqrt(Math.pow((gamePieces[f].x - player.x), 2) + Math.pow((gamePieces[f].y - player.y), 2)) < (gamePieces[f].size + player.size) / 2) {
        gameState = 'dead';
      }
      if (gamePieces[f].x > (640 + gamePieces[f].size)
      || gamePieces[f].x < (gamePieces[f].size * -1)
      || gamePieces[f].y > (480 + gamePieces[f].size)
      || gamePieces[f].y < (gamePieces[f].size * -1)
      || time > gamePieces[f].timeOut) {
        delete gamePieces[f];
        gamePieces = gamePieces.slice(0, f).concat(gamePieces.slice(f + 1));
        f--;
      }
    }
    requestAnimationFrame(step);
  } else if (gameState === 'dead') {
    axios.post('/leaderboard', {
      mode: 1,
      score: time,
      initials: 'JDP'
    })
    .then(results1 => {
      axios.get('/leaderboard')
      .then(results2 => {
        let scores = (results2.data.sort((a, b) => {return b.score - a.score})).slice(0, 10);
        ctxFG.font = '16px monospace';
        ctxFG.textAlign = 'center';
        for (let f = 0; f < scores.length; f++) {
          ctxFG.fillStyle = scores[f].score === time ? '#00FF00' : '#FFFFFF';
          ctxFG.fillText(scores[f].initials + ': ' + (scores[f].score / 60).toFixed(2), 320, 40 * (f + 1));
        }
      })
      .catch(err => {
        throw err;
      });
    })
    .catch(err => {
      throw err;
    });
  }
}
step();