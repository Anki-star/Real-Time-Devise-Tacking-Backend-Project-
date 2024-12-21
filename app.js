const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const path = require('path'); 

const server = http.createServer(app);
const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location",{id:socket.id, ...data});
        console.log("Location sent to other users");
    });
    socket.on("disconnect", () => {
        io.emit("user-disconnected",socket.id);
        console.log("user disconnected");
    });
  console.log('New user connected');
});

server.listen(2000);
