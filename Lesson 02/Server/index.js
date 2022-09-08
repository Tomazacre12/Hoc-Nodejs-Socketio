var express = require('express')
var app = express()
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')

var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(1981)

io.on('connection', function(socket){
    console.log(socket.id + ' đã kết nối')
    socket.on('disconnect', function(){
        console.log(socket.id + ' đăng xuất khỏi trái đất')
    })
    socket.on('Client-send-data', function(data){
        console.log(socket.id+' vừa gửi: '+ data)
        io.sockets.emit('Server-send-data', data + ' lmao')

        // socket.emit('Server-send-data', data + ' lmao')

        // socket.broadcast.emit('Server-send-data', data + ' lmao')
    })
    socket.on('Client-send-mau', function(data){
        console.log(data)
        io.sockets.emit('server-send-mau',data)
    })
})

app.get('/', function(req, res){
    res.render('trangchu')
})