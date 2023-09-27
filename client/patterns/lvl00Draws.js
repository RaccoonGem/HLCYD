import game from '../game.js';

let draws = [
  (ctx, E, P) => { // E is "enemy", P is "player"
    ctx.fillStyle = E.color;
    ctx.beginPath();
    ctx.moveTo(E.x, E.y);
    ctx.arc(E.x, E.y, E.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#000000";
    let lookDir = game.calcAngle(E, P);
    ctx.beginPath();
    ctx.moveTo(E.x + (Math.cos(lookDir) * E.size / 4), E.y + (Math.sin(lookDir) * E.size / 4));
    ctx.arc(E.x + (Math.cos(lookDir) * E.size / 4), E.y + (Math.sin(lookDir) * E.size / 4), E.size / 8, 0, Math.PI * 2);
    ctx.fill();
  }
];

export default draws;