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
})

app.get('/', function(req, res){
    res.render('trangchu')
})