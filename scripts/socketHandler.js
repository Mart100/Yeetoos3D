let Vector = require('./vector.js')
let createObjects = require('./createObjects.js')
let [Cube, Object3D] = createObjects

function handleSocket(socket, objects, players, io) {
  console.log(`user {${socket.id}} connected`)

  // add player to players object
  players[socket.id] = {
    pos: new Vector(),
    rot: new Vector(),
    id: socket.id,
    movement: {
      w: false,
      a: false,
      s: false,
      d: false,
      shift: false,
    },
    mouse: {
      isDown: false
    },
    shooting: {
      cooldown: 0
    },
    health: 100
  }

  // send all objects to client
  for(let object of objects) socket.emit('addObject', object)

  // Add player cube to World
  let playerBodySettings = {color: '#000000', id: `playerBody:${socket.id}`, follow: {id: `player:${socket.id}`, rot: {y: true}}}
  objects.push(new Cube(new Vector(-50, 0, -50), new Vector(50, 200, 50), playerBodySettings))
  io.emit('addObject', objects[objects.length-1])

  // when client disconnects
  socket.on('disconnect', () => {
    console.log(`user {${socket.id}} disconnected`)

    // delete playerBody
    delete objects.find((a) => a.settings.id == 'playerBody:'+socket.id)
    io.emit('deleteObject', 'playerBody:'+socket.id)

    // remove player from players
    delete players[socket.id]
    io.emit('deletePlayer', socket.id)
  })

  // when client tries to move
  socket.on('playerMovement', movement => { 
    players[socket.id].movement = movement
  })

  // when client sends rotation
  socket.on('playerRotation', rot => { 
    players[socket.id].rot = rot
  })

  // when client sends mouse info
  socket.on('playerMouse', mouse => { 
    players[socket.id].mouse = mouse
  })
}

module.exports = handleSocket