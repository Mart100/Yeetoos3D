let ctx, canvas
let input = {
    keys: {}, 
    mouse: {movement: {x: 0, y: 0, latest: 0}, locked: false},
    movement: {w: false, a: false, s: false, d: false, shift: false}
}
let debugPanel
let frameCount = 0
let settings = {}
settings.strokeBlack = true
let players = []
const World = {
    objects: [],
    camera: {
        pos: new Vector(),
        rot: new Vector(),
        mode: 'firstPerson' // firstPerson / static / thirdperson
    },
    player: {
        height: 200,
        movement: {
            jumping: 0,
            jumpingInterval: 0,
            speed: 1,
            walking: false
        },
        pos: new Vector(0, 200, -500),
        rot: new Vector(0, 0, 0)
    }
}

$(function() {
    canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Lock mouse when click on canvas
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock
    document.addEventListener('click', () => {canvas.requestPointerLock() })

    ctx = canvas.getContext('2d')
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.miterLimit = 1
    setInterval(() => { tick() }, 10)

    // some functions
    debugPanel = new DebugPanel
    frame()
    testing()
    inputHandler()    

    // Loop for testing
    setInterval(() => {
        debugPanel.add('Jumping', World.player.movement.jumping)
        debugPanel.add('CameraRot', JSON.stringify(World.camera.rot))
        debugPanel.add('PlayerPos', World.player.pos)
    }, 10)


})
function inputHandler() {
    // keys
    $(document).keyup(function(event) { input.keys[event.keyCode] = false })
    $(document).keydown(function(event) { input.keys[event.keyCode] = true })

    // keyPress
    $(document).keypress((event) => {
    })

    // when mouse move
    document.addEventListener("mousemove", (event) => {
        input.mouse.movement = {x: event.movementX, y: event.movementY, latest: 0}
        debugPanel.add('mouseMov', {x: event.movementX, y: event.movementY})
    })

    // on mouse lock and unlock
    if ("onpointerlockchange" in document) {
        document.addEventListener('pointerlockchange', lockChange, false)
    } else if ("onmozpointerlockchange" in document) {
        document.addEventListener('mozpointerlockchange', lockChange, false)
    }

    function lockChange() {
        if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) input.mouse.locked = true
        else input.mouse.locked = false
    }



    // loop
    setInterval(() => {
        let player = World.player

        input.movement.w = false
        input.movement.a = false
        input.movement.s = false
        input.movement.d = false
        input.movement.shift = false
        input.movement.space = false

        // keys
        // moving
        if(input.keys[87]) input.movement.w = true
        if(input.keys[65]) input.movement.a = true
        if(input.keys[83]) input.movement.s = true
        if(input.keys[68]) input.movement.d = true
        if(input.keys[16]) input.movement.shift = true

        if(input.keys[32]) input.movement.space = true
        
        let mouseMov = input.mouse.movement

        // if mouse moved in last 10ms and mouse is locked: rotate player 
        if(mouseMov.latest < 10 && input.mouse.locked) {
            player.rot.y = ((mouseMov.x)/1000)+player.rot.y

            // x rotation
            if(mouseMov.y > 0 && player.rot.x > 0 ||
               mouseMov.y < 0 && player.rot.x < Math.PI) {
                player.rot.x = ((mouseMov.y)/-1000)+player.rot.x
            }
        }

        // update latest mouse movement
        mouseMov.latest++

    }, 10)

}

function testing() {
    //console.log(new Cube(new Vector(6,6,6), new Vector(-10,-10,-10)).getPos())
}