var message_id = 0;
var client_id = 0;
function postMessage() {
    let message = document.getElementById("message-content").value;
    message_id++;
    acum = new Date();
    acum = acum.getDate() + "-" + acum.getMonth() + ":" + acum.getHours() + ":" + acum.getMinutes() + ":" + acum.getSeconds() + "   ";
    document.getElementById("chat-content").innerHTML += acum + message + "<br/> ";
    document.getElementById("message-content").value = "";
}

function getMessages(newMessages) {

}

function lookForParteners() {
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange =
        //fac rost client_id
            function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    client_id = JSON.parse(xmlhttp.responseText);
                    client_id = client_id.id;
                    document.getElementById("waiting").innerHTML = "Please wait while we finde a person to chat";
                    askForReadyParteners();
                    return;
                }
            }
    }
    xmlhttp.open("GET", "chat", true);
    xmlhttp.send();
}

function askForReadyParteners()
{
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange =
        //intreb daca a mai gasit un user!
            function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let gata = JSON.parse(xmlhttp.responseText).ready;
                    if(gata == 0)
                    {
                        setTimeout( askForReadyParteners, 1000);
                    }
                    else{
                        document.getElementById("waiting").innerHTML += "<br/>Am gasit un looser!!!";
                        return;
                    }
                }
            }
    }
    xmlhttp.open("GET", "readyPartener", true);
    xmlhttp.send(client_id);
    
}