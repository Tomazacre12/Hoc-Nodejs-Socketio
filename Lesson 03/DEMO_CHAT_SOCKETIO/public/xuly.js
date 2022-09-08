var socket = io('http://localhost:1981')

socket.on('server-send-dki-thatbai', function(){
    alert('Username đã sử dụng')
})
socket.on('server-send-danhsach-Users', function(data){
    $('.boxContent').html('')
    data.forEach(function(i){
        $('.boxContent').append('<div class="user">' + i + '</div>')
    })
})
socket.on('server-send-dki-thanhcong', function(data){
    $('#currentUser').html(data)
    $('.loginForm').hide(2000)
    $('.chatForm').show(1000)
})
socket.on('server-send-message',function(data){
    $('#listMessage').append ('<div class="ms">'+data.un+':'+data.nd+'</div>')
})
socket.on('someone-typing', function(data){
    $('.thongbao').html(data)
})
socket.on('someone-stop-typing', function(){
    $('.thongbao').html('')
})
$(document).ready(function(){
    $('#txtMessage').focusin(function(){
        socket.emit('toi-dang-go-chu')
    })
    $('#txtMessage').focusout(function(){
        socket.emit('toi-stop-go-chu')
    })
    $('.loginForm').show()
    $('.chatForm').hide()
    $('#btnRegister').click(function(){
        socket.emit('client-send-Username', $('#txtUsername').val())
    })
    $('#btnLogout').click(function(){
        socket.emit('logout')
        $('.loginForm').show(1000)
        $('.chatForm').hide(2000)
    })
    $('#btnSendMessage').click(function(){
        socket.emit('user-send-message', $('#txtMessage').val())
    })
})