var express = require('express')
var app = express()
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './views')

var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(1981)

var mangUsersOnline = []

io.on('connection', function(socket){
    console.log(socket.id + 'đã kết nối')
    socket.on('client_gui_username', function(data){
        console.log('username:' + data)
        if(mangUsersOnline.indexOf(data)>=0){
            socket.emit('server-send-dangki-thatbai', data)
        }else{
            mangUsersOnline.push(data)
            socket.Username = data
            io.sockets.emit('server-send-dangki-thanhcong', {username:data, id:socket.id})
        }
    })
    socket.on('client_gui_message', function(data){
        io.sockets.emit('server_gui_message', {username:socket.Username, msg:data})
    })
    socket.on('user-choc-id', function(data){
        io.to(data).emit('server_xuly_choc', socket.Username)
    })
})

app.get('/', function(req, res){
    res.render('trangchu')
})