// New object received
socket.on('addObject', (object) => {
  console.log('New Object received')


  // convert corners into vectors
  for(let j in object.corners) {
    object.corners[j] = new Vector(object.corners[j])
  }

  // convert faces corners into vectors
  for(let j in object.faces) {
    for(let k in object.faces[j]) {
      object.faces[j][k] = new Vector(object.faces[j][k])
    }
  }

  // convert rot into vector
  object.settings.rot = new Vector(object.rot)

  // push object to world
  World.objects.push(new Object3D(object.faces, object.corners, object.settings))

  
})

// Update Object
socket.on('updateObject', (newObject) => {

  let oldObject = World.objects.find((a) => a.settings.id == newObject.settings.id)

  // convert corners into vectors
  for(let j in newObject.corners) {
    oldObject.corners[j] = new Vector(newObject.corners[j])
  }

  // convert faces corners into vectors
  for(let j in newObject.faces) {
    for(let k in newObject.faces[j]) {
      oldObject.faces[j][k] = new Vector(newObject.faces[j][k])
    }
  }

  // convert rot into vector
  newObject.settings.rot = new Vector(oldObject.rot)
  
})

// delete object
socket.on('deleteObject', (id) => {
  delete World.objects.find((a) => a.settings.id == id)
})

// remove Player
socket.on('deletePlayer', (id) => {
  delete players[id]
})
// player data received
socket.on('player', (player) => {

  // change objects to vectors
  player.rot = new Vector(player.rot)
  player.pos = new Vector(player.pos)




  players[player.id] = player
  
  // if playerData is itself. Put right data in World.player
  if(player.id == socket.id) {
    World.player.pos = player.pos
  }
})