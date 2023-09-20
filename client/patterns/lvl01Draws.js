import game from '../game.js';

let draws = [
  (ctx) => {
    ctx.fillStyle = game.enemy.color;
    ctx.beginPath();
    ctx.moveTo(game.enemy.x, game.enemy.y);
    ctx.arc(game.enemy.x, game.enemy.y, game.enemy.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#000000";
    let lookDir = game.calcAngle(game.enemy, game.player);
    ctx.beginPath();
    ctx.moveTo(game.enemy.x + (Math.cos(lookDir) * game.enemy.size / 4), game.enemy.y + (Math.sin(lookDir) * game.enemy.size / 4));
    ctx.arc(game.enemy.x + (Math.cos(lookDir) * game.enemy.size / 4), game.enemy.y + (Math.sin(lookDir) * game.enemy.size / 4), game.enemy.size / 8, 0, Math.PI * 2);
    ctx.fill();
  }
];

export default draws;