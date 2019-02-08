let Vector = require('./vector.js')

const mathUtils = {

  getPointClosestToLine(a, b, c) {
    // a = point. b = line1. c = line2
    // https://i.imgur.com/8eaqNuL.png
    //
    dba = this.getAngleOfPoints(a, b, c)
    ba = a.clone().minus(b).getMagnitude()
    bd = Math.cos(dba)*ba
    bcVec = c.clone().minus(b)
    d = bcVec.clone().setMagnitude(bd)

    return d
  },

  getAngleOfPoints(a, b, c) {
    // https://stackoverflow.com/questions/17763392/how-to-calculate-in-javascript-angle-between-3-points
    let AB = a.clone().minus(b).getMagnitude()
    let BC = b.clone().minus(c).getMagnitude()
    let AC = a.clone().minus(c).getMagnitude()
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))

  }
}

module.exports = mathUtils