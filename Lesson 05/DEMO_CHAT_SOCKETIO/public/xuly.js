var socket = io('http://localhost:1981')

socket.on('server-gui-ds', function(data){
    $('#ds').html('')
    data.map(function(hocvien, index){
        $('#ds').append(`
        <div class="hocvien">
                    <div class="hang1">id:`+index+` || <span>`+ hocvien.HOTEN +`</span></div>
                    <div class="hang2">`+ hocvien.EMAIL +` - `+ hocvien.SODT +`</div>
         </div>
        `)
    })
})

$(document).ready(function(){
    $('#btnRegister').click(function(){
        socket.emit('hocvien-gui-thongtin', 
        {hoten:$('#txtHoten').val(),
         email:$('#txtEmail').val(),    
         dienthoai:$('#txtSoDT').val()}
        )
    })
})