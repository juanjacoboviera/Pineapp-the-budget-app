import { login } from "./services/auth.js";


const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submit");
const btnText = document.getElementById('btnText');
const spinner = document.getElementById('spinner');
const createUserBtn = document.querySelector("#create__user");

submitBtn.addEventListener("click", e =>{
    e.preventDefault()
    const userError = document.querySelector("#userName__error")
    const passwordError = document.querySelector("#password__error")
    let user = form.userName.value
    let password = form.password.value
    const onSubmit = async () => {
        spinner.style.display = 'inline-block';
        btnText.textContent = 'Signing in...';
        submitBtn.disabled = true;
        try {
            const response = await login(user, password)
            sessionStorage.setItem("token", JSON.stringify(response.token));
            window.location.href = "./pages/dashboard.html";
        } catch (error) {
            console.log("this is the error:", error)
        } finally {
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    }
    onSubmit()
    // console.log(onSubmit())
    // login(user, password)
    
    // if(user === "user" && password === 123){
    //     let loggedIn = true;
    //     userError.textContent = ""
    //     passwordError.textContent = ""
    //     console.log("success!")
    //     sessionStorage.setItem("loggedin", JSON.stringify(loggedIn));
    //     window.location.href = "./pages/dashboard.html";

    // }else{
    //     userError.textContent = ""
    //     passwordError.textContent = "*Incorrect password"
    // }
    // if (user.length == 0 && (!isNaN(password) || isNaN(password))){
    //     userError.textContent = "*Enter a username"
    //     passwordError.textContent = ""
    // }
    // if (user.length >= 1 && isNaN(password)){
    //     userError.textContent = ""
    //     passwordError.textContent = "*Enter a password"
    // }
    // if ((user.length >=1  && user !== "user") && !isNaN(password)){
    //     userError.textContent = "*User does not exist"
    //     passwordError.textContent = ""
        
    // }

})

// createUserBtn.addEventListener("click", async ()=>{
//     try{
//         const url = "http://localhost:3000/auth/register"
//         const response = await fetch(url,{
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ username: "user", password: "123", role: "user" }),
//         })
//         const data = await response.json()
//         console.log(data)
//     }catch(error){
//         console.log(error)
//     }
// })