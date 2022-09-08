var express = require('express')
var app = express()
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')

var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(1981)


io.on('connection', function(socket){
    console.log(socket.id + 'đã kết nối')
    socket.on('tao-room', function(data){
        socket.join(data)
        socket.Phong = data

        var mang = []
        for(r in socket.adapter.rooms){
            mang.push(r)
        }
        io.sockets.emit('server-send-room', mang)
    })
    
})

app.get('/', function(req, res){
    res.render('trangchu')
})