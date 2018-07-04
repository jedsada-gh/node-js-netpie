const socketServer = require('http').createServer()
const io = require('socket.io')(socketServer)

const netpie = require('./netpie')

io.on('connection', (socket) => {

    socket.emit('hello', {
        say: 'hello'
    })

    socket.on("sayback", (data) => {
        console.log(data)
        socket.emit('hello-again', {
            say: 'fuck'
        })
    })

    netpie.on('message', function (topic, body) {
        console.log('incoming topic: ' + topic + '\tmessage: ' + body);
        if (topic == '/ihere/door/status') {
            // TODO : handler command
            socket.emit('/door/activities', body)
        }
    });

})

module.exports = socketServer