import game from '../game.js';

let draws = [
  (ctx, E, P) => { // E is "enemy", P is "player"
    ctx.fillStyle = E.color;
    ctx.beginPath();
    ctx.moveTo(E.x, E.y);
    ctx.arc(E.x, E.y, E.size / 2, 0, Math.PI * 2);
    ctx.fill();
    let anim = [(4 + Math.sin(game.time / 10)) / 16,
    (4 + Math.cos(game.time / 10)) / 16,
    (4 - Math.sin(game.time / 10)) / 16,
    (4 - Math.cos(game.time / 10)) / 16];
    ctx.beginPath();
    ctx.moveTo(E.x + (E.size * anim[0]), E.y + (E.size * anim[0]));
    ctx.arc(E.x + (E.size * anim[0]), E.y + (E.size * anim[0]), E.size * anim[2], 0, Math.PI * 2);
    ctx.moveTo(E.x - (E.size * anim[1]), E.y + (E.size * anim[1]));
    ctx.arc(E.x - (E.size * anim[1]), E.y + (E.size * anim[1]), E.size * anim[3], 0, Math.PI * 2);
    ctx.moveTo(E.x - (E.size * anim[2]), E.y - (E.size * anim[2]));
    ctx.arc(E.x - (E.size * anim[2]), E.y - (E.size * anim[2]), E.size * anim[0], 0, Math.PI * 2);
    ctx.moveTo(E.x + (E.size * anim[3]), E.y - (E.size * anim[3]));
    ctx.arc(E.x + (E.size * anim[3]), E.y - (E.size * anim[3]), E.size * anim[1], 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(E.x + (E.size / 4), E.y);
    ctx.quadraticCurveTo(320, 32, 320 + E.size, -64);
    ctx.lineTo(320 - E.size, -64);
    ctx.quadraticCurveTo(320, 32, E.x - (E.size / 4), E.y);
    ctx.fill();
  }
];

export default draws;