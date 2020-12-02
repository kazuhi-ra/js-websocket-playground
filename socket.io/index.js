'use strict'
const fs = require('fs')
const http = require('http')
const Server = require('socket.io')

const server = http
  .createServer((req, res) => {
    const stream = fs.createReadStream('index.html')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    stream.pipe(res)
  })
  .listen(3000)

// Serverインスタンスを作成
const io = Server(server)

io.on('connection', socket => {
  socket.emit('test', 'socket.io: 接続成功です')

  socket.on('message', message => {
    console.log(message)
    io.emit('message', message)
  })
})
