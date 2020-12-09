'use strict';

let Santa = require('./santa_class.js');

let sweden = {	
		latitude:67.498454,
		longitude:21.040181
	};

let mySanta = new Santa(sweden);

const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express();
app.disable("x-powered-by")
app.use(express.static('public'))
app.use('/images', express.static(__dirname + '/images'))
app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval( () => io.emit('time', new Date().toTimeString()), 1000);
setInterval( () => io.emit('santa', JSON.stringify(mySanta.getPosition())), 1000);
