const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const LoginRegisterScreen = require('./LoginRegisterScreen.js');
const port = 5555;
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
        res.send({ready:1, text:"Am Gasit inca un looser"});
    }
    else{
        res.send({ready:0});
    }

});


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:` + port));