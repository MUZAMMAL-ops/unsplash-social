const express = require('express');
const app = express();
const db = require('./dbconnection');
const router = require('./approutes');
const { Socket } = require('node:dgram');
const {createServer} = require('node:http')
const {Server} = require('socket.io')
const bodyParser = require('body-parser')
const { yellow, red, cyan } = require('kleur');
const jsonParser = bodyParser.json();
const cors = require('cors')
var controller = require('./controller');
const generateToken = require('./generateToken')


const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      }
});
app.use(cors({
    origin: '*',
  }));

app.use(router)
app.use(jsonParser)
console.log()
app.use('/',router)
io.sockets.on('connection', controller.connsocket);


// app.use((req, res, next) => {
//     req.io = io;
//     next();
// });

server.listen(5000)



module.exports = io
