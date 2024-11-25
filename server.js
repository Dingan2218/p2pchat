const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve frontend files

let users = []; // Keep track of connected users

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    let username = '';

    // Set username for the connected user
    socket.on('set_username', (name) => {
        username = name;
        users.push({ id: socket.id, username });
        console.log(`User ${socket.id} set their username as ${username}`);
    });

    // Handle incoming messages
    socket.on('message', (message) => {
        console.log(`Message received from ${username}: ${message}`);
        io.emit('message', { username, message }); // Broadcast to all users
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User ${username} disconnected.`);
        users = users.filter((user) => user.id !== socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Accessible on your local network at http://192.168.1.45:${PORT}`);
});

