$(document).ready(function(){
    var socket = io();
    $(document.body).on('change',"#cselect",function (e) {
        //doStuff
        var optVal= $("#cselect option:selected").val();
        socket.emit("classChange", optVal);
    });
});
