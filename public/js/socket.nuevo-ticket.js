//Comando para establecer la comunicacion
var socket = io();

var label = $('#lblNuevoTicket');



socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})

socket.on('estadoActual', function(resp) {
    console.log(resp.actual);
    label.text(resp.actual);

});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        //Imprimir la respuesta del callback
        label.text(siguienteTicket);
    });

    /*socket.emit('siguienteTicket', function(resp) {
        console.log('Respuesta servidor', resp);
    });*/




});