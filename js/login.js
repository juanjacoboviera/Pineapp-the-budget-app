const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", e =>{
    e.preventDefault()
    const userError = document.querySelector("#userName__error")
    const passwordError = document.querySelector("#password__error")
    let user = form.userName.value
    let password = parseInt(form.password.value)
    console.log(password)
    if(user === "juan" && password === 123){
        let loggedIn = true;
        userError.textContent = ""
        passwordError.textContent = ""
        console.log("success!")
        sessionStorage.setItem("loggedin", JSON.stringify(loggedIn));
        window.location.href = "./pages/dashboard.html";

    }else{
        userError.textContent = ""
        passwordError.textContent = "*Incorrect password"
    }
    if (user.length == 0 && (!isNaN(password) || isNaN(password))){
        userError.textContent = "*Enter a username"
        passwordError.textContent = ""
    }
    if (user.length >= 1 && isNaN(password)){
        userError.textContent = ""
        passwordError.textContent = "*Enter a password"
    }
    if ((user.length >=1  && user !== "juan") && !isNaN(password)){
        userError.textContent = "*User does not exist"
        passwordError.textContent = ""
        
    }
    
   
   


})