var express = require('express')
var app = express()
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')

var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(1981)

var mangUsers = []

io.on('connection', function(socket){
    console.log(socket.id + 'đã kết nối')
    socket.on('client-send-Username', function(data){
        if(mangUsers.indexOf(data)>=0){
            socket.emit('server-send-dki-thatbai')
        }else{
            mangUsers.push(data)
            socket.Username = data
            socket.emit('server-send-dki-thanhcong', data)
            io.sockets.emit('server-send-danhsach-Users', mangUsers)
        }
    })
    socket.on('logout', function(){
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1
        )
        socket.broadcast.emit('server-send-danhsach-Users', mangUsers)
    })
    socket.on('user-send-message', function(data){
        io.sockets.emit('server-send-message', {un:socket.Username, nd:data})
    })
    socket.on('toi-dang-go-chu', function(){
       var s = socket.Username + ' đang gáy...'
       io.sockets.emit('someone-typing', s)
    })  
    socket.on('toi-stop-go-chu', function(){
        io.sockets.emit('someone-stop-typing')
    })
})

app.get('/', function(req, res){
    res.render('trangchu')
})