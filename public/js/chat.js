//Client_send_Message
console.log("ok");

const formSendData = document.querySelector(".chat .inner-form");
if(formSendData)
{
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        let content = e.target.elements.content.value;
        if(content)
            socket.emit("CLIENT_SEND_MESSAGE",content);
            e.target.elements.content.value = "";
    })
}

//End Client_send_Message
