const express = require('express')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const port = 3000

// import scripts/
let handleSocket = require('./scripts/socketHandler.js')
let createWorld = require('./scripts/createWorld.js')
let Vector = require('./scripts/vector.js')
let tick = require('./scripts/process.js')
let mathUtils = require('./scripts/mathUtils.js')

// create objects
let objects = []
createWorld(objects)

// Players object
let players = {}

// set /client as client thingy
app.use(express.static('client'))

// When new client connects to server
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html')
})

http.listen(process.env.PORT || port, () => console.log(`Yeetoos3D listening on port ${port}!`))

// when client connects to socket.io
io.on('connection', (socket) => {
  handleSocket(socket, objects, players, io)
})

// run process
setInterval(() => { tick(objects, players, io)}, 10)


// testing
console.log(mathUtils.getPointClosestToLine(new Vector(0, 0), new Vector(0, 1), new Vector(1, 0)))