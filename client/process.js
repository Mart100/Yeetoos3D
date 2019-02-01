function tick() {
  // Move camera
  
  // if firstPerson Set camera to player
  if(World.camera.mode == 'firstPerson') {
    World.camera.rot = World.player.rot.clone()
    World.camera.pos = World.player.pos.clone()
    World.camera.pos.y += World.player.height
  }

  // send player data
  socket.emit('playerMovement', input.movement)
  socket.emit('playerRotation', World.player.rot)
  socket.emit('playerMouse', input.mouse)

  // if mouse down. play sound
  if(input.mouse.isDown && players[socket.id].shooting.cooldown < 1) {
    console.log('pew')
    sounds.pew.play()
  }
}


let animationCount = 0
setInterval(() => {
  animationCount++

  // Walking and sprinting and breathing animation
  if(!settings.fly && World.player.pos.y < 1) {
    if(World.player.movement.walking) {
      World.player.height = 200 - Math.cos((animationCount/20)*World.player.movement.speed)*World.player.movement.speed*10
    } else {
      World.player.height = 200 - Math.cos(animationCount/50)*5
    }
  }
}, 10)