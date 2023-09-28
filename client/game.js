let game = {
  state: 'menu',
  level: 0,
  time: 0,
  pieces: [],
  calcDistance: (thisObj, thatObj) => {
    return Math.sqrt(((thisObj.x - thatObj.x) ** 2) + ((thisObj.y - thatObj.y) ** 2));
  },
  calcAngle: (thisObj, thatObj) => {
    if (thisObj.x === thatObj.x) {
      if (thisObj.y > thatObj.y) {
        return 3 * Math.PI / 2;
      } else {
        return Math.PI / 2;
      }
    } else {
      return Math.atan2(thatObj.y - thisObj.y, thatObj.x - thisObj.x);
    }
  },
  addVector: (v1, v2) => {
    let resultX = (Math.cos(v1.dir) * v1.spd) + (Math.cos(v2.dir) * v2.spd);
    let resultY = (Math.sin(v1.dir) * v1.spd) + (Math.sin(v2.dir) * v2.spd);
    return {
      spd: Math.sqrt((resultX ** 2) + (resultY ** 2)),
      dir: game.calcAngle({x: 0, y: 0}, {x: resultX, y: resultY})
    };
  }
};
export default game;