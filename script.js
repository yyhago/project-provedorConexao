const  popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .titulo"),
reconnectBtn = document.querySelector(".reconec"),
popupDesc = document.querySelector(".popup .descricao");

let userOnline = true, intervalId, tempo = 10;

const checkConnection = async () => {
    try{

        const respostauser = await fetch("https://jsonplaceholder.typicode.com/posts");
        userOnline = respostauser.status >= 200 && respostauser.status < 300;

    } catch(error) {
        userOnline = false;
    }   
    tempo = 10;
    clearInterval(intervalId);
    identPopup(userOnline);
}

const identPopup = (status) => {
    if(status) {
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerHTML = "Conexão Recuperada com Sucesso!";
        popupDesc.innerHTML = "Sua conexão foi restaurada com sucesso. Aproveite agora sua internet!"
        popup.classList.add("online");
        return setTimeout (() => popup.classList.remove("show"), 2000);
    }

    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerHTML = "Conexão Perdida - Conecte-se no Wifi!";
    popupDesc.innerHTML = "A internet caiu! Aguarde o tempo de <b>10</b> segundos para tentar uma  nova conexão!"
    popup.className = "popup show";

    intervalId = setInterval(() => {
        tempo--;
        if(tempo == 0) checkConnection();
        popup.querySelector(".descricao b").innerHTML = tempo;
    }, 1000);
}



setInterval(() => userOnline && checkConnection(), 3000);

reconnectBtn.addEventListener("click", checkConnection);