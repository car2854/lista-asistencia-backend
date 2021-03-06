require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const fileUpload = require('express-fileupload');

const { dbConnection } = require('./database/config');

// Crear servidor
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
  cors: {
    origin: true,
    credentials: true
  }
});
require('./sockets/index');

// Configurar CORS
app.use(cors());

// Lecutra y parseo del body
app.use( express.json() )

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// app.use( fileUpload({
//   useTempFiles : true,
//   tempFileDir : '/tmp/',
//   createParentPath: true
// }));

// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/profesor', require('./routes/profesor') );
app.use( '/api/estudiante', require('./routes/estudiante') );
app.use( '/api/admin', require('./routes/admin') );
app.use( '/api/materia', require('./routes/materia') );
app.use( '/api/examen', require('./routes/examen') );

app.use( '/api/upload', require('./routes/uploads') );

app.use( '/api/verify', require('./routes/verify') );

app.get('*', (req, res) => {
  res.sendFile( path.resolve(__dirname, 'public/index.html') );
});

server.listen( process.env.PORT, () => {
  	console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});