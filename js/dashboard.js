// variables
const logOut = document.querySelector("#nav__link4");

//functions
(() =>{
    if(sessionStorage.getItem("loggedin")){
        console.log("success!")
    } else {
        window.location.href = "http://192.168.1.3:5500/index.html";
    }
})()

// eventListeners

logOut.addEventListener("click", ()=>{
    sessionStorage.removeItem("loggedin")
    window.location.href = "http://192.168.1.3:5500/index.html";
})