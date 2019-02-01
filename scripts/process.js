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
  
  playerMovement(player)
  playerShooting(player, players)
  playerRegeneration(player)

}

// Runs every tick for every object
function tickObject(object, objects, players, io) {
  let objectS = object.settings

  objectFollow(object, objects, players, io)

}

function playerRegeneration(player) {
  if(player.health < 100) player.health += 0.1
}

function playerShooting(player, players) {
  // countdown countdown
  player.shooting.cooldown--

  // if player countdown < 0. And mouseDown SHOOOOT
  if(player.shooting.cooldown < 0 && player.mouse.isDown) {
    // check if "bullet" hit player

    // loop trough players
    for(let id in players) {
      let opp = players[id]

      if(id == player.id) continue

      let oppPos = opp.pos.clone()

      oppPos.rotate('all', player.rot)
      oppPos.minus(player.pos)
      
      // perspective
      let r = 400 / oppPos.y
      if(r < 0) r *= -1
      oppPos = new Vector(r * oppPos.x, r * oppPos.z, oppPos.z)

      // if hit
      if(Math.abs(oppPos.x) < 200 && Math.abs(oppPos.y) < 200) {
        opp.health -= 10
        console.log('HIT')
      }
    }
    // reset cooldown
    player.shooting.cooldown = 25

  }

}

function playerMovement(player) {
  let rot = 0
  // moving
  if(player.movement.w) { // W
    rot = player.rot.y + Math.PI/2
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    if(player.movement.shift) vec.multiply(2)
    vec.multiply(3)
    vec = checkPlayerCollision(player, objects, vec)
    player.pos.plus(vec)
  }

  if(player.movement.s) { // S
    rot = player.rot.y - Math.PI/2
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    vec.multiply(3)
    vec = checkPlayerCollision(player, objects, vec)
    player.pos.plus(vec)
  }

  if(player.movement.a) { // A
    rot = player.rot.y
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    vec.multiply(3)
    vec = checkPlayerCollision(player, objects, vec)
    player.pos.plus(vec)
  }
  
  if(player.movement.d) { // D
    rot = player.rot.y - Math.PI
    let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
    vec.multiply(3)
    vec = checkPlayerCollision(player, objects, vec)
    player.pos.plus(vec)
  }

  // any movement
  if(player.movement.w || player.movement.a || player.movement.s || player.movement.d) {
    player.movement.walking = true
  }

}

function checkPlayerCollision(player, objects, move) {
  // sort objects closest to player
  objects.sort(() => {
    
  })
}

function objectFollow(object, objects, players, io) {
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
    if(otf == undefined) return

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