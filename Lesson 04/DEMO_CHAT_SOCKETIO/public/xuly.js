var socket = io('http://localhost:1981')

socket.on('server-send-room', function(data){
    data.map(function(r){
        $('#dsRoom').append('<h4>' + r + '</h4>')
    })
})

$(document).ready(function(){
  $('#btnTaoRoom').click(function(){
    socket.emit('tao-room', $('#txtRoom').val())
  })
})