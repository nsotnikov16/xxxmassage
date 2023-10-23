const express = require('express');
const cors = require('cors');
const app = express();
const options = {
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt')
};
const server = require('https').createServer(app, options);
const io = require('socket.io')(server, {
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
    console.log(`Server running at https://localhost:${port}`);
});
