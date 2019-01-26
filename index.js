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

http.listen(port, () => console.log(`Yeetoos3D listening on port ${port}!`))

// when client connects to socket.io
io.on('connection', (socket) => {
  handleSocket(socket, objects, players, io)
})

// run process
setInterval(() => { tick(objects, players, io)}, 10)