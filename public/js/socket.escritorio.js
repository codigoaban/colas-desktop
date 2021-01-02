//para establecer la conexion, abrir la comunicacion
var socket = io();

//recuperar los parametros que vienen por el URL
var searchParams = new URLSearchParams(window.location.search);

//console.log(searchParams);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario'); // evita que siga ejecutando codigo, equivale al RETURN( esto es solo para funciones)

}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        //console.log(resp);
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket' + resp.numero);

    });
});