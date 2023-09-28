import game from '../game.js';

let draws = [
  (ctx, E, P) => { // E is "enemy", P is "player"
    ctx.fillStyle = E.color;
    ctx.translate(E.x, E.y);
    ctx.rotate(game.calcAngle(E, P));
    ctx.beginPath();
    ctx.moveTo(E.size / 2, 0);
    ctx.lineTo(E.size / -2, E.size / 2);
    ctx.lineTo(E.size / -2, E.size / -2);
    ctx.lineTo(E.size / 2, 0);
    ctx.fill();
    ctx.resetTransform();
  }
];

export default draws;