import GamePiece from './objects/GamePiece.js';
import Player from './objects/Player.js';
import Enemy from './objects/Enemy.js';
import game from './game.js';

const canvasBG = document.getElementById('bg');
const canvasMG = document.getElementById('mg');
const canvasFG = document.getElementById('fg');
const ctxBG = canvasBG.getContext('2d');
const ctxMG = canvasMG.getContext('2d');
const ctxFG = canvasFG.getContext('2d');

const levelCount = 3;
let scores = [];
let scoresSorted = [];
for (let f = 0; f < levelCount; f++) {
  scores.push([]);
  scoresSorted.push([]);
}

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

game.player = new Player(controls);
game.enemy = new Enemy();
game.pieces = [game.player, game.enemy];

ctxBG.fillStyle = '#000000';
ctxBG.fillRect(0, 0, 640, 480);

//////// STEP BEGINS HERE ////////
let step = function() {
  ctxMG.clearRect(0, 0, 640, 480);
  //////// MENU ////////
  if (game.state === 'menu') {
    ctxFG.clearRect(0, 0, 640, 480);

    ctxFG.fillStyle = '#FFFFFF'; //Drawing the menu
    ctxFG.font = '32px monospace';
    ctxFG.textAlign = 'center';
    ctxFG.fillText('How Long Can You Dodge?', 320, 64);
    ctxFG.fillText('Level ' + game.level, 320, 430);
    ctxFG.font = '16px monospace';
    for (let f = 0; f < (scoresSorted[game.level].length > 10 ? 10 : scoresSorted[game.level].length); f++) {
      ctxFG.fillText((scoresSorted[game.level][f] / 60).toFixed(2), 320, 30 * (f + 3.5));
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
        game.level--;
        game.level = game.level >= 0 ? game.level : levelCount - 1;
        canSelect = false;
      } else if (controls.ArrowRight) {
        game.level++;
        game.level = game.level < levelCount ? game.level : 0;
        canSelect = false;
      }
    }
    if (controls[" "]) {
      ctxFG.clearRect(0, 0, 640, 480);
      game.time = 0;
      game.player.x = 320;
      game.player.y = 360;
      game.enemy.x = 320;
      game.enemy.y = 120;
      game.enemy.vel.dir = 0;
      game.enemy.vel.spd = 0;
      game.enemy.nextTime = 120;
      game.enemy.action = 0;
      game.enemy.cMovement = 0;
      game.state = 'loading';
      game.enemy.init();
    }
  }
  //////// DODGING ////////
  else if (game.state === 'dodging') {
    game.time++; // Increment time

    for (let f = 0; f < game.pieces.length; f++) { // Loop through each game piece
      game.pieces[f].update();
      game.pieces[f].draw(ctxMG);
      if (game.pieces[f].deadly && game.pieces[f].collision()) { // Player death
        scores[game.level].push(game.time);
        scoresSorted[game.level] = scores[game.level].sort((a, b) => {return b - a});
        canRespawn = false;
        game.pieces = game.pieces.slice(0, 2);
        game.state = 'dead';
        continue;
      }
      if (f >= 2 && (game.pieces[f].x > (640 + game.pieces[f].size)
      || game.pieces[f].x < (game.pieces[f].size * -1)
      || game.pieces[f].y > (480 + game.pieces[f].size)
      || game.pieces[f].y < (game.pieces[f].size * -1)
      || game.time > game.pieces[f].timeOut)) {
        delete game.pieces[f];
        game.pieces = game.pieces.slice(0, f).concat(game.pieces.slice(f + 1));
        f--;
      }
    }

    ctxMG.fillStyle = '#FFFFFF'; // Draw time
    ctxMG.font = '16px monospace';
    ctxMG.textAlign = 'center';
    ctxMG.fillText((game.time / 60).toFixed(2), 320, 16);
  }
  //////// DEAD ////////
  else if (game.state === 'dead') {
    ctxFG.clearRect(0, 0, 640, 480);

    ctxFG.font = '16px monospace';
    ctxFG.textAlign = 'center';
    ctxFG.fillStyle = '#FFFFFF';
    ctxFG.fillText('Level ' + game.level, 320, 40);
    for (let f = 0; f < (scoresSorted[game.level].length > 10 ? 10 : scoresSorted[game.level].length); f++) {
      ctxFG.fillStyle = scoresSorted[game.level][f] === game.time ? '#00FF00' : '#FFFFFF';
      ctxFG.fillText((scoresSorted[game.level][f] / 60).toFixed(2), 320, 40 * (f + 2));
    }

    ctxFG.fillStyle = '#FFFFFF';
    ctxFG.textAlign = 'left';
    ctxFG.fillText('esc: Level select', 32, 416);
    ctxFG.fillText('spacebar: Retry', 32, 448);

    if (controls.Escape) { // Game over screen controls
      ctxFG.clearRect(0, 0, 640, 480);
      game.time = 0;
      game.state = 'menu';
    } else if (controls[" "] && canRespawn) {
      ctxFG.clearRect(0, 0, 640, 480);
      game.time = 0;
      game.player.x = 320;
      game.player.y = 360;
      game.enemy.x = 320;
      game.enemy.y = 120;
      game.enemy.vel.dir = 0;
      game.enemy.vel.spd = 0;
      game.enemy.nextTime = 120;
      game.enemy.cAttack = Math.floor(Math.random() * game.enemy.attacks.length);
      game.enemy.action = 0;
      game.enemy.cMovement = 0;
      game.state = 'dodging';
    }
    canRespawn = !controls[" "];
  }
  requestAnimationFrame(step);
}
step();