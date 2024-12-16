import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

//Client_send_Message
console.log("ok");

const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        let content = e.target.elements.content.value;
        if (content)
            socket.emit("CLIENT_SEND_MESSAGE", content);
        e.target.elements.content.value = "";
    })
}

//End Client_send_Message

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");

    const body = document.querySelector(".chat .inner-body");

    const div = document.createElement("div");
    let htmlFullname = "";
    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        htmlFullname = `<div class="inner-name"> ${data.fullname} </div>`;
        div.classList.add("inner-incoming");
    }

    div.innerHTML = `
    ${htmlFullname}
    <div class="inner-content"> ${data.content} </div>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
});
//end SERVER_RETURN_MESSAGE

//scroll chat to botoom 
const bodyChat = document.querySelector(".chat .inner-body");

if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
//end scroll chat to botoom 

//show icon chat
//show pop up
const buttonIcon = document.querySelector(".button-icon");
if(buttonIcon)
{
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
      }
}
//end show pop up

//INSERT ICON IN TO INPUT
const emojiPicker = document.querySelector("emoji-picker");
if(emojiPicker)
{
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click",(event)=>{
       const icon = event.detail.unicode;
       inputChat.value = inputChat.value + icon;
    })
}
//END INSERT ICON IN INPUT


//end show icon chat
