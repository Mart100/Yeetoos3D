let Vector = require('./vector.js')
let createObjects = require('./createObjects.js')
let [Cube, Object3D] = createObjects

function createWorld(objects) {
  // house
  objects.push(new Cube(new Vector(-500, -1, -500), new Vector(500, 0, 500), {color: '#e00b0b', id: 'Floor'})) //Floor
  objects.push(new Cube(new Vector(500, 0, 500), new Vector(500, 500, -500), {color: '#32a80b', id: 'Back'})) //Back
  objects.push(new Cube(new Vector(500, 0, -500), new Vector(-500, 500, -500), {color: '#0936bc', id: 'SideR'})) //Side Right
  objects.push(new Cube(new Vector(500, 0, 500), new Vector(-500, 500, 500), {color: '#0936bc', id: 'SideL'})) //Side left
  objects.push(new Cube(new Vector(500, 396, -250), new Vector(-500, 1103, -250), {color: '#0936bc', id: 'roofR', rot: new Vector(-Math.PI/4, 0, 0)})) //Roof Right
  objects.push(new Cube(new Vector(500, 396, 250), new Vector(-500, 1103, 250), {color: '#0936bc', id: 'roofR', rot: new Vector(Math.PI/4, 0, 0)})) //Roof Left

  let roofBackCorners = [new Vector(500, 500, 500), new Vector(500, 1000, 0), new Vector(500, 500, -500)]
  let roofBackFaces = [[roofBackCorners[0], roofBackCorners[1], roofBackCorners[2]]]
  objects.push(new Object3D(roofBackFaces, roofBackCorners, {color: '#32a80b', id: 'BackRoof'})) //Roof Back


  objects.push(new Cube(new Vector(-510, 0, 500), new Vector(-500, 500, -100), {color: '#05e7fc', id: 'Front1'})) //Front1
  objects.push(new Cube(new Vector(-510, 0, -300), new Vector(-500, 500, -500), {color: '#05e7fc', id: 'Front2'})) //Front2

  let roofFrontCorners = [new Vector(-510, 500, 500), new Vector(-500, 1000, 0), new Vector(-500, 500, -500)]
  let roofFrontFaces = [[roofFrontCorners[0], roofFrontCorners[1], roofFrontCorners[2]]]
  objects.push(new Object3D(roofFrontFaces, roofFrontCorners, {color: '#05e7fc', id: 'FrontRoof'})) //Roof Front

  objects.push(new Cube(new Vector(-510, 300, -100), new Vector(-500, 500, -300), {color: '#05e7fc', id: 'Front3'})) //Part above door

  return objects
}

module.exports = createWorld