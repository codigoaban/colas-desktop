const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {




    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente); // este regresa a la pantalla del front-end y lo recibe el callback de  socket.emit


    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTickect(),
        ultimos4: ticketControl.getUltimos4()
    });

    //data(escritorio u otra cosa)
    //callback= para notificar cuando se haga el proceso
    client.on('atenderTicket', (data, callback) => {

        //validamos
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        //retornamos a la vista
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            //actual: ticketControl.getUltimoTickect(),
            ultimos4: ticketControl.getUltimos4()
        })




    })

});