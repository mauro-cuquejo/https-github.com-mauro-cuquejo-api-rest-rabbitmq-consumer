const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

var canal, conexion;

async function conectar(queue) {
    let urlRabbit = (process.env.NODE_ENV === 'production') ?
        process.env.RABBITMQ_SERVER_CONTENEDOR :
        process.env.RABBITMQ_SERVER_LOCAL;

    conexion = await amqp.connect(urlRabbit);
    canal = await conexion.createChannel();
    await canal.assertQueue(queue);
}

//sender
exports.encolarJSON = async function (queue, stringJson) {
    conectar(queue).then(() => {
        canal.sendToQueue(queue, Buffer.from(stringJson));
        setTimeout(function () { this.conexion.close(); }, 500);
    });
    if (this.canal) this.canal.close();
}
