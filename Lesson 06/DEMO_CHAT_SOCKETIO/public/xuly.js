var socket = io('http://localhost:1981')

socket.on('server-send-dangki-thatbai', function(data){
    alert('Username '+ data +' đã tồn tại !')
})

socket.on('server-send-dangki-thanhcong', function(data){
    var s = '<div socketid="'+data.id+'" class="motUser">' + data.username + '</div>'
    $('#danhsachUsersOnline').append(s)
})

socket.on('server_gui_message', function(data){
    var hoten = '<span class="hoten"> ' + data.Username + ' </span>'
    var msg = '<span class="msg"> ' + data.msg + ' </span>'
    $('#dsMsg').append(hoten + msg + '<br>')
})

$(document).ready(function(){
    $('#btnDangki').click(function(){
        socket.emit('client_gui_username', $('#txtUser').val())
        
    })
    $('btnChat').click(function(){
        socket.emit('client_gui_message', $('txtMessage').val())
    })
})