// code away!
const express = require('express');
const server = express();
const usersRouter = require('./data/routers/users');

server.get('/', (req, res) => {
 res.sendStatus('Home page');
});
server.use('/users', usersRouter);

server.listen(8000, () => console.log('magic happens on port 8000'));
