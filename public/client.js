var client_id = 0;
function postMessage() {
    let xmlhttp;
    let message = document.getElementById("message-content").value;
    document.getElementById("message-content").value = "";
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
   
    xmlhttp.open("POST", "message", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("id=" + client_id + "&message=" + message);
    // acum = new Date();
    // acum = acum.getDate() + "-" + acum.getMonth() + ":" + acum.getHours() + ":" + acum.getMinutes() + ":" + acum.getSeconds() + "   ";
    //document.getElementById("chat-content").innerHTML += message + "<br/> ";

}

function getMessages(newMessages) {
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let messages = xmlhttp.responseText;
                    document.getElementById("chat-content").innerHTML = messages;
                }
            }
    }
    xmlhttp.open("GET", "messages", true);
    xmlhttp.send();
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
                    document.getElementById("lookForPartenersButton").hidden = true;
                    askForReadyParteners();
                    return;
                }
            }
    }
    xmlhttp.open("GET", "chat", true);
    xmlhttp.send();
}

function askForReadyParteners() {
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange =
            //intreb daca a mai gasit un user!
            function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    let raspuns = JSON.parse(xmlhttp.responseText);
                    let gata = raspuns.ready;
                    if (gata == 0) {
                        setTimeout(askForReadyParteners, 1000);
                    }
                    else {
                        document.getElementById("waiting").innerHTML += "<br/>Am gasit un looser!!!";
                        askForChatRoom();
                    }
                }
            }
    }
    xmlhttp.open("GET", "readyPartener", true);
    xmlhttp.send();
}

function askForChatRoom() {
    let xmlhttp;

    xmlhttp = new XMLHttpRequest();

    console.log("Fac cerere la chatroom!");
    xmlhttp.open("GET", "chatroom", false);
    xmlhttp.send({id: client_id});
    document.getElementById("body").innerHTML = xmlhttp.responseText;
}
