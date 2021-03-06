const fs = require('fs');
let utilizatori = JSON;

function updateUsers(next) {
    fs.readFile('utilizatori.json', (err, data) => {
        if (err) throw err;
        utilizatori = JSON.parse(data);
        next();
    });

}

var session = "";

class LoginRegisterScreen {
    constructor(app) {
        this._app = app;
        
    }

    getSession(){
        return session;
    }
    
    raspunsPostLogin(req, res) {

        updateUsers(() => {
            let logat = 0;
            for (let i = 0; i < utilizatori.length && logat == 0; i++) {
                if (req.body.username == utilizatori[i].utilizator && req.body.password == utilizatori[i].parola) {
                    logat = 1;
                }
            }
            if (logat == 0) {
                res.send("Login Error!");
                session="";
            
            }
            else {
                session = req.session;
                session.username = req.body.username;
                res.render('accountpage', {utilizator: session.username});
            }
        });
        

    }

    raspunsGetRegister(req, res) {
        res.render('register');
    }

    raspunsPostRegister(req, res) {
        updateUsers(() => {
            let utilizatorNou = {
                utilizator: req.body.username,
                parola: req.body.password,
                email: req.body.email
            }
            utilizatori.push(utilizatorNou);
            session = req.session;
            session.username = req.body.username;
            res.render('accountpage', {utilizator: session.username});
        });
        

    }
}

module.exports = LoginRegisterScreen;


