const { io } = require('../index');


const { 
  disconnect,
  getVideo
} = require('./socket');

io.on('connection', client => {
  console.log('Cliente conectado');

  disconnect(client);

  getVideo(client);
});