const io = require('socket.io')()

io.on('connect', socket => {
  socket.emit('connection establish')

  /* setInterval(() => {
    socket.emit('Hello world!')
  }, 2000)

  socket.on('new message', (number, cb) => {
    // cb->callback
    console.log('a new message received with number', number)
    console.log('replying with', number + 1)
    cb(number + 1)
  })

  socket.on('another response', cb => {
    cb('another api response')
  }) */

  socket.on('go live', cb => cb(true))
})

module.exports = io
