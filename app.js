const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const LoginRegisterScreen = require('./LoginRegisterScreen.js');
const port = 5555;
const Room = require('./room');
const session = require('express-session');
const app = express();
const io = require('socket.io')(3000);
const fs = require('fs');

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session ({
    secret:'secret',
    resave: 'false',
    saveUnitialized: false,
    cockie: { maxAge: 10000}
}));


_loginRegister = new LoginRegisterScreen(app);
let rooms = [];


let nr_clienti = 0;
app.get('/register', _loginRegister.raspunsGetRegister);
app.post('/login', _loginRegister.raspunsPostLogin);
app.post('/register', _loginRegister.raspunsPostRegister);
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/chat', (req, res) => {
    nr_clienti++;
    console.log('Inainte sa trimit client_id:' + nr_clienti);
    res.send({id:nr_clienti});
});

app.get('/readyPartener', (req, res) =>{

    console.log("Tratez cerere pentru readyPartner!!");
    if(nr_clienti %2 ==0)
    {

        res.send({ready:1});

    }
    else{
        res.send({ready:0});
    }

});

var chatRoomRequestCount = 0;
app.get('/chatroom', (req, res) =>{
    let user_id1 = nr_clienti - 1;
    let user_id2 = nr_clienti;
    chatRoomRequestCount ++;
    if(chatRoomRequestCount == 2) // dupa ce ambii useri fac request la chat room
    {
        let newRoom = new Room(rooms.length, user_id1, user_id2);
        rooms.push(newRoom);
        console.log("Am creat Camera:" + rooms.length + " cu userii:" + user_id1 + " si " + user_id2);
        chatRoomRequestCount = 0;
    }
    

    res.render('chatroom');
});

app.post('/message', (req, res) => {
    let client_id = req.body.id;
    let message = req.body.message;
    rooms[(client_id-1)/2].appendToChat(message);
    console.log("Am primit mesajul:" + message);
    
});



app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:` + port));