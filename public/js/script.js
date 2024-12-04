//show alert 
const showAlert = document.querySelector("[show-alert]");

const idshow = document.getElementById("show");
const idx = document.getElementById("idx");


if(showAlert)
{
    const closeAlert = showAlert.querySelector("[close-alert]");
    const time = parseInt(showAlert.getAttribute("data-time"));

    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
        // showAlert.removeChild(idshow.firstChild);
    },time)

    closeAlert.addEventListener('click',()=>{
        showAlert.classList.add("alert-hidden");
    })
}

//end show alert

