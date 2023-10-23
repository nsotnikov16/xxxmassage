const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    path: '/socket',
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    socket.on('update-state', (state) => {
        io.emit('update-state', state);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
