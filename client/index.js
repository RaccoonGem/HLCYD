import GamePiece from './objects/GamePiece.js';
import Player from './objects/Player.js';
import Enemy from './objects/Enemy.js';
import Bullet from './objects/Bullet.js';

const canvasBG = document.getElementById('bg');
const canvasMG = document.getElementById('mg');
const canvasFG = document.getElementById('fg');
const ctxBG = canvasBG.getContext('2d');
const ctxMG = canvasMG.getContext('2d');
const ctxFG = canvasFG.getContext('2d');

let gameState = 'menu';
let level = 0;
const levelCount = 3;
let time = 0;
let scores = [];
let scoresSorted = [];
for (let f = 0; f < levelCount; f++) {
  scores.push([]);
  scoresSorted.push([]);
}
let attacks = [];

let trackKeys = function (keys) {
  let down = Object.create(null);
  let track = function (event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === 'keydown';
      event.preventDefault();
    }
  }
  window.addEventListener('keydown', track);
  window.addEventListener('keyup', track);
  return down;
}
const controls = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Escape"]);
let canRespawn = false;
let canSelect = false;

const player = new Player(controls);
const enemy = new Enemy();
let gamePieces = [player, enemy];

attacks = [() => {
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

ctxBG.fillStyle = '#000000';
ctxBG.fillRect(0, 0, 640, 480);

//////// STEP BEGINS HERE ////////
let step = function() {
  ctxMG.clearRect(0, 0, 640, 480);
  //////// MENU ////////
  if (gameState === 'menu') {
    ctxFG.clearRect(0, 0, 640, 480);

    ctxFG.fillStyle = '#FFFFFF'; //Drawing the menu
    ctxFG.font = '32px monospace';
    ctxFG.textAlign = 'center';
    ctxFG.fillText('How Long Can You Dodge?', 320, 64);
    ctxFG.fillText('Level ' + level, 320, 432);
    ctxFG.font = '16px monospace';
    for (let f = 0; f < (scoresSorted[level].length > 10 ? 10 : scoresSorted[level].length); f++) {
      ctxFG.fillText((scoresSorted[level][f] / 60).toFixed(2), 320, 30 * (f + 3.5));
    }

    ctxFG.strokeStyle = '#FFFFFF';
    ctxFG.lineWidth = 2;
    ctxFG.strokeRect(200, 400, 240, 44);
    ctxFG.beginPath();
    ctxFG.moveTo(200, 400);
    ctxFG.lineTo(192, 408);
    ctxFG.lineTo(192, 460);
    ctxFG.lineTo(448, 460);
    ctxFG.lineTo(448, 408);
    ctxFG.lineTo(440, 400);
    ctxFG.moveTo(200, 444);
    ctxFG.lineTo(192, 460);
    ctxFG.moveTo(440, 444);
    ctxFG.lineTo(448, 460);
    ctxFG.stroke();

    ctxFG.strokeRect(464, controls.ArrowRight ? 404 : 400, 44, 44); // Right Arrow Button
    ctxFG.beginPath();
    ctxFG.moveTo(475, controls.ArrowRight ? 415 : 411); // Arrow Symbol
    ctxFG.lineTo(497, controls.ArrowRight ? 426 : 422);
    ctxFG.lineTo(475, controls.ArrowRight ? 437 : 433);
    ctxFG.lineTo(475, controls.ArrowRight ? 415 : 411);
    ctxFG.moveTo(464, controls.ArrowRight ? 404 : 400); // Outline
    ctxFG.lineTo(456, 408);
    ctxFG.lineTo(456, 460);
    ctxFG.lineTo(516, 460);
    ctxFG.lineTo(516, 408);
    ctxFG.lineTo(508, controls.ArrowRight ? 404 : 400);
    ctxFG.moveTo(464, controls.ArrowRight ? 448 : 444); // Front Edges
    ctxFG.lineTo(456, 460);
    ctxFG.moveTo(508, controls.ArrowRight ? 448 : 444);
    ctxFG.lineTo(516, 460);
    ctxFG.stroke();

    ctxFG.strokeRect(132, controls.ArrowLeft ? 404 : 400, 44, 44); // Left Arrow Button
    ctxFG.beginPath();
    ctxFG.moveTo(165, controls.ArrowLeft ? 415 : 411); // Arrow Symbol
    ctxFG.lineTo(143, controls.ArrowLeft ? 426 : 422);
    ctxFG.lineTo(165, controls.ArrowLeft ? 437 : 433);
    ctxFG.lineTo(165, controls.ArrowLeft ? 415 : 411);
    ctxFG.moveTo(132, controls.ArrowLeft ? 404 : 400); // Outline
    ctxFG.lineTo(124, 408);
    ctxFG.lineTo(124, 460);
    ctxFG.lineTo(184, 460);
    ctxFG.lineTo(184, 408);
    ctxFG.lineTo(176, controls.ArrowLeft ? 404 : 400);
    ctxFG.moveTo(132, controls.ArrowLeft ? 448 : 444); // Front Edges
    ctxFG.lineTo(124, 460);
    ctxFG.moveTo(176, controls.ArrowLeft ? 448 : 444);
    ctxFG.lineTo(184, 460);
    ctxFG.stroke();

    if (!controls.ArrowLeft && !controls.ArrowRight) { // Menu Controls
      canSelect = true;
    }
    if (canSelect) {
      if (controls.ArrowLeft) {
        level--;
        level = level >= 0 ? level : levelCount - 1;
        canSelect = false;
      } else if (controls.ArrowRight) {
        level++;
        level = level < levelCount ? level : 0;
        canSelect = false;
      }
    }
    if (controls[" "]) {
      ctxFG.clearRect(0, 0, 640, 480);
      time = 0;
      gameState = 'dodging';
    }
  }
  //////// DODGING ////////
  else if (gameState === 'dodging') {
    ctxMG.fillStyle = '#FFFFFF'; // Draw time
    ctxMG.font = '16px monospace';
    ctxMG.textAlign = 'center';
    ctxMG.fillText((time / 60).toFixed(2), 320, 16);

    time++; // Increment time

    if (time === enemy.nextTime) {
      attacks[Math.floor(Math.random() * attacks.length)]();
    }

    for (let f = 0; f < gamePieces.length; f++) { // Draw each game piece
      gamePieces[f].update();
      gamePieces[f].draw(ctxMG);
    }

    for (let f = 2; f < gamePieces.length; f++) {
      if (Math.sqrt(Math.pow((gamePieces[f].x - player.x), 2) + Math.pow((gamePieces[f].y - player.y), 2)) // Player Death
      < (gamePieces[f].size + player.size) / 2) {
        scores[level].push(time);
        scoresSorted[level] = scores[level].sort((a, b) => {return b - a});
        canRespawn = false;
        player.x = 320;
        player.y = 360;
        enemy.x = 320;
        enemy.y = 120;
        enemy.direction = 0;
        enemy.speed = 1;
        enemy.nextTime = 120;
        gamePieces = gamePieces.slice(0, 2);
        gameState = 'dead';
        continue;
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
  }
  //////// DEAD ////////
  else if (gameState === 'dead') {
    ctxFG.clearRect(0, 0, 640, 480);
    ctxFG.font = '16px monospace';
    ctxFG.textAlign = 'center';
    ctxFG.fillStyle = '#FFFFFF';
    ctxFG.fillText('Level ' + level, 320, 40);
    for (let f = 0; f < (scoresSorted[level].length > 10 ? 10 : scoresSorted[level].length); f++) {
      ctxFG.fillStyle = scoresSorted[level][f] === time ? '#00FF00' : '#FFFFFF';
      ctxFG.fillText((scoresSorted[level][f] / 60).toFixed(2), 320, 40 * (f + 2));
    }

    if (controls.Escape) {
      ctxFG.clearRect(0, 0, 640, 480);
      time = 0;
      gameState = 'menu';
    } else if (controls[" "] && canRespawn) {
      ctxFG.clearRect(0, 0, 640, 480);
      time = 0;
      gameState = 'dodging';
    }
    canRespawn = !controls[" "];
  }
  requestAnimationFrame(step);
}
step();