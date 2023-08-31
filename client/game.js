let game = {
  state: 'menu',
  level: 0,
  time: 0,
  pieces: [],
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
  }
};
export default game;