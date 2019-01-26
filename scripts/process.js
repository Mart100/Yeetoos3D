let Vector = require('./vector.js')

function tick(objects, players, io) {

  // loop trough players
  for(let i in players) tickPlayer(players[i], objects, players, io)

  // Loop trough objects
  for(let i in objects) tickObject(objects[i], objects, players, io)

  // send back all players data
  for(let i in players) io.emit('player', players[i])


}

// Runs every tick for every player
function tickPlayer(player, objects, players, io) {
  // apply gravity
  if(player.pos.y > 0) player.pos.y -= 5
  
  // moving
  if(player.movement.w) { // W
    let rot = player.rot.y + Math.PI/2
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    if(player.movement.shift) vec.multiply(2)
    vec.multiply(2)
    player.pos.plus(vec)
    player.movement.walking = true
  }

  if(player.movement.s) { // S
    let rot = player.rot.y - Math.PI/2
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    vec.multiply(2)
    player.pos.plus(vec)
    player.movement.walking = true
  }

  if(player.movement.a) { // A
    let rot = player.rot.y
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    vec.multiply(2)
    player.pos.plus(vec)
    player.movement.walking = true
  }
  
  if(player.movement.d) { // D
    let rot = player.rot.y - Math.PI
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    vec.multiply(2)
    player.pos.plus(vec)
    player.movement.walking = true
  }

}

// Runs every tick for every object
function tickObject(object, objects, players, io) {
  let objectS = object.settings

  // if object has follow property. Follow
  if(objectS.follow != undefined) {
    let follow = objectS.follow

    // otf = Object To Follow. so the target
    let otf = objects.find((a) => a.settings.id == follow.id)

    // if followid is player
    if(follow.id.split(':')[0] == 'player') {
      otf = players[follow.id.split(':')[1]]
    }
    if(otf == undefined) return console.log('otf Undefined; process.js/73; :: '+follow.id)

    object.setPos(otf.pos) // set position to target

    if(follow.rot != undefined) { // if rotation is specified
      let rot = new Vector()

      if(follow.rot.x) rot.edit('x', otf.rot.x)
      if(follow.rot.y) rot.edit('y', otf.rot.y)
      if(follow.rot.z) rot.edit('z', otf.rot.z)


      object.setRot(rot) // set Rotation to target
    }

    // send updated position of object to client
    io.emit('updateObject', object)
  }

}

module.exports = tick