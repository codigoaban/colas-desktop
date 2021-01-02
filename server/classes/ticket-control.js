const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }


}



class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        //console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();

        }

    }




    siguiente() {
        this.ultimo += 1;
        this.grabarArchivo();
        let ticket = new Ticket(this.ultimo, null); // null para escritorio, pues no sabemos quien lo va atender

        //agregamos el ticket
        this.tickets.push(ticket);


        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTickect() {

        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {

        return this.ultimos4;
    }


    atenderTicket(escritorio) {

        // //verificar tickets pendietes de atender
        // if (this.tickets.length === 0) {
        //     return "No hay tickets"
        // }

        // //ahora extraemos el primer ticket de la cola de espera
        // let numeroTicket = this.tickets[0].numero;
        // this.tickets.shift(); //borramos de la cola el ticket

        // //crear un nuevo ticket y escritorio para atender
        // let atenderTicket = new Ticket(numeroTicket, escritorio);

        // //lo agrega al inicio del arreglo
        // this.ultimos4.unshift(atenderTicket);

        // //verificar que solo existan 4 ticket en este arreglo ultimos4
        // if (this.ultimos4.length > 4) {
        //     this.ultimos4.splice(-1, 1); //borra el ultimo elemento
        // }

        // console.log("Ultimos 4");
        // console.log(this.ultimos4);

        // //grabar en la abse de datos
        // this.grabarArchivo();

        // //regresamos el archivo que queremos atender
        // return atenderTicket;

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = []; // reiniciar tickets pendientes
        this.ultimos4 = []; //reiniciar
        console.log('Se ha inicializado el sistema');

        this.grabarArchivo();
    }


    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, //graba el arreglo de tickets pendientes de atender
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);



    }

}


module.exports = {
    TicketControl
}