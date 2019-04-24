// code away!
const express = require('express');
const server = express();
const usersRouter = require('./data/routers/users');
const postsRouter = require('./data/routers/posts');
server.use(express.json());

server.get('/', (req, res) => {
 res.send('Home page');
});
server.use('/users', usersRouter);
server.use('/posts', postsRouter);

server.listen(8000, () => console.log('magic happens on port 8000'));
