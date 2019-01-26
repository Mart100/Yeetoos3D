class Object3D {
  constructor(faces, corners, settings) {
    this.corners = corners
    this.faces = faces

    if(settings == undefined) settings = {}
    this.settings = settings

    // rotation
    this.rot = new Vector()
    if(settings.rot != undefined) this.setRot(settings.rot)

  }
  setPos(to) {
    let currentPos = this.getPos()
    for(let i of this.corners) i.minus(currentPos).plus(to)
  }
  movePos(amount) {
    for(let i of this.corners) i.plus(to)
  }
  getPos() {
    // X
    let allX = []
    let sumX = 0
    let averageX = 0
    for(let i of this.corners) allX.push(i.x)
    for(let i=0;i<allX.length;i++) sumX += allX[i]
    averageX = sumX/allX.length

    // Y
    let allY = []
    let sumY = 0
    let averageY = 0
    for(let i of this.corners) allY.push(i.y)
    for(let i=0;i<allY.length;i++) sumY += allY[i]
    averageY = sumY/allY.length

    // Z
    let allZ = []
    let sumZ = 0
    let averageZ = 0
    for(let i of this.corners) allZ.push(i.z)
    for(let i=0;i<allZ.length;i++) sumZ += allZ[i]
    averageZ = sumZ/allZ.length

    return new Vector(averageX, averageY, averageZ)
  }
  setRot(rot) {
    let currentPos = this.getPos()
    for(let i of this.corners) {
        i.minus(currentPos).rotate('all', this.rot.clone().minus(rot)).plus(currentPos)
    }
    this.rot = rot.clone()
  }
}