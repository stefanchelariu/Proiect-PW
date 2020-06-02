class Room{
    Room(room_id, usr1_id, usr2_id ){

        this.room_id = room_id;
        this.usr1_id = usr1_id;
        this.usr2_id = usr2_id;
        this.chat = "";
    }

    getRoomByUserID(id)
    {
        if(this.usr1_id == id || this.usr2_id )
        {
            return this.room_id;
        }
        else{
            return 0;
        }
    }

    appendToChat(text)
    {
        
        this.chat += text;
        console.log("In Room: Mesajele sunt: " + this.chat);
    }
}

module.exports = Room;