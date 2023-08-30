import GamePiece from './objects/GamePiece.js';
import Player from './objects/Player.js';
import Enemy from './objects/Enemy.js';
import Bullet from './objects/Bullet.js';
// import './patterns/lvl01Attacks.js';

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
let action = 0;
let movements = [];
let cMovement = 0;

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

attacks = attacks01;
let currentAttack = Math.floor(Math.random() * attacks.length);

movements = [
  () => {
    enemy.direction += 1 / 180 * Math.PI;
  },
  () => {
    enemy.x = ((3 * enemy.x) + enemy.targetX) / 4;
    enemy.y = ((3 * enemy.y) + enemy.targetY) / 4;
  }
];

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
    ctxFG.fillText('Level ' + level, 320, 430);
    ctxFG.font = '16px monospace';
    for (let f = 0; f < (scoresSorted[level].length > 10 ? 10 : scoresSorted[level].length); f++) {
      ctxFG.fillText((scoresSorted[level][f] / 60).toFixed(2), 320, 30 * (f + 3.5));
    }

    ctxFG.strokeStyle = '#FFFFFF';
    ctxFG.lineWidth = 2;
    ctxFG.strokeRect(200, 400, 240, 40);
    ctxFG.beginPath();
    ctxFG.moveTo(200, 400);
    ctxFG.lineTo(192, 408);
    ctxFG.lineTo(192, 456);
    ctxFG.lineTo(448, 456);
    ctxFG.lineTo(448, 408);
    ctxFG.lineTo(440, 400);
    ctxFG.moveTo(200, 440);
    ctxFG.lineTo(192, 456);
    ctxFG.moveTo(440, 440);
    ctxFG.lineTo(448, 456);
    ctxFG.stroke();

    ctxFG.strokeRect(472, controls.ArrowRight ? 404 : 400, 40, 40); // Right Arrow Button
    ctxFG.beginPath();
    ctxFG.moveTo(482, controls.ArrowRight ? 414 : 410); // Arrow Symbol
    ctxFG.lineTo(502, controls.ArrowRight ? 424 : 420);
    ctxFG.lineTo(482, controls.ArrowRight ? 434 : 430);
    ctxFG.lineTo(482, controls.ArrowRight ? 414 : 410);
    ctxFG.moveTo(472, controls.ArrowRight ? 404 : 400); // Outline
    ctxFG.lineTo(464, 408);
    ctxFG.lineTo(464, 456);
    ctxFG.lineTo(520, 456);
    ctxFG.lineTo(520, 408);
    ctxFG.lineTo(512, controls.ArrowRight ? 404 : 400);
    ctxFG.moveTo(472, controls.ArrowRight ? 444 : 440); // Front Edges
    ctxFG.lineTo(464, 456);
    ctxFG.moveTo(512, controls.ArrowRight ? 444 : 440);
    ctxFG.lineTo(520, 456);
    ctxFG.stroke();

    ctxFG.strokeRect(128, controls.ArrowLeft ? 404 : 400, 40, 40); // Left Arrow Button
    ctxFG.beginPath();
    ctxFG.moveTo(158, controls.ArrowLeft ? 414 : 410); // Arrow Symbol
    ctxFG.lineTo(138, controls.ArrowLeft ? 424 : 420);
    ctxFG.lineTo(158, controls.ArrowLeft ? 434 : 430);
    ctxFG.lineTo(158, controls.ArrowLeft ? 414 : 410);
    ctxFG.moveTo(128, controls.ArrowLeft ? 404 : 400); // Outline
    ctxFG.lineTo(120, 408);
    ctxFG.lineTo(120, 456);
    ctxFG.lineTo(176, 456);
    ctxFG.lineTo(176, 408);
    ctxFG.lineTo(168, controls.ArrowLeft ? 404 : 400);
    ctxFG.moveTo(128, controls.ArrowLeft ? 444 : 440); // Front Edges
    ctxFG.lineTo(120, 456);
    ctxFG.moveTo(168, controls.ArrowLeft ? 444 : 440);
    ctxFG.lineTo(176, 456);
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
      attacks[currentAttack][action].moves();
      enemy.nextTime += attacks[currentAttack][action].cd;
      action++;
      if (action === attacks[currentAttack].length) {
        action = 0;
        currentAttack = Math.floor(Math.random() * attacks.length);
      }
    }
    movements[cMovement]();

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

    ctxFG.fillStyle = '#FFFFFF';
    ctxFG.textAlign = 'left';
    ctxFG.fillText('esc: Level select', 32, 416);
    ctxFG.fillText('spacebar: Retry', 32, 448);

    if (controls.Escape) { // Game over screen controls
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