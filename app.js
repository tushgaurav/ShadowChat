const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

//Render Index page
app.get('/', (req, res) => {
    res.render('index')
})

//Get username and roomname from form and pass it to room
app.post('/room', (req, res) => {
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

//Rooms
app.get('/room', (req, res)=>{
    res.render('room', {roomname: req.query.roomname, username: req.query.username})
})

//Start Server
const server = app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true});
require('./utils/socket')(io);