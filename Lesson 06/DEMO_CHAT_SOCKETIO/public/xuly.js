var socket = io('http://localhost:1981')

socket.on('server-send-dangki-thatbai', function(data){
    alert('Username '+ data +' đã tồn tại !')
})

socket.on('server-send-dangki-thanhcong', function(data){
    var s = '<div socketid="'+data.id+'" class="motUser">' + data.username + '</div>'
    $('#danhsachUsersOnline').append(s)
})

socket.on('server_gui_message', function(data){
    var hoten = '<span class="hoten"> ' + data.username + ': </span>'
    var msg = '<span class="msg"> ' + data.msg + ' </span>'
    $('#dsMsg').append(hoten + msg + '<br>')
})

socket.on('server_xuly_choc', function(data){
    alert(data + ' vừa mới ỉa lên đầu bạn')
})

$(document).ready(function(){
    $('#btnDangki').click(function(){
        socket.emit('client_gui_username', $('#txtUser').val())        
    })
    $('#btnChat').click(function(){
        socket.emit('client_gui_message', $('#txtMessage').val())
        $('#txtMessage').val('')
    })
    $(document).on('click', '.motUser', function(){
        var id = $(this).attr('socketid')
        socket.emit('user-choc-id', id)
    })
})