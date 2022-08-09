import { printSummary, getLocalStorageItems } from "../js/functions.js";

// variables
const logOut = document.querySelector("#nav__link4");
const recentEntriesContainer = document.querySelector(".generic__container")
let [classInstance] = getLocalStorageItems()


//functions
var myHeaders = new Headers();
myHeaders.append("apikey", "rQXF9heikHGGGu2r1BEeiAchlRqKenhJ");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=EUR%2CJPY%2CCOP%2CCAD%2CGBP&base=USD", requestOptions)
  .then(response => response.text())
  .then(result => {
    const euroInput = document.querySelector("#euro");
    const gbpInput = document.querySelector("#gbp");
    const jpyInput = document.querySelector("#jpy");
    const cadInput = document.querySelector("#cad");
    const copInput = document.querySelector("#cop");

    const currencies = JSON.parse(result)
    const {EUR, COP, CAD, GBP, JPY} = currencies.rates;

    euroInput.textContent = EUR.toFixed(2);
    gbpInput.textContent = GBP.toFixed(2);
    jpyInput.textContent = JPY.toFixed(2);
    cadInput.textContent = CAD.toFixed(2);
    copInput.textContent = COP.toFixed(2);
    
})
  .catch(error => console.log('error', error));



const printRecentEntries = () =>{
    recentEntriesContainer.innerHTML = "";
    let reversedEntries 
    let slicedEntries
    console.log(classInstance)
    if(classInstance.length >= 4){
        reversedEntries = classInstance.reverse()
        slicedEntries = reversedEntries.slice(0,4)
    }
    console.log(slicedEntries)
    console.log(reversedEntries.length)
    slicedEntries.map(el =>{
        recentEntriesContainer.innerHTML += `
        <div class="recentEntries__card">
            <div class="left__section">
                <div class="entry__icon">
                     <i class="fa-solid ${el.iconCategory} iconBackground__circle table__icons"></i>
                </div>
                <div class="entry__category">
                     <h2>${el.category}</h2>
                     <p>${el.description}</p>
                </div>
            </div>
            <div class="right__section">
                <p class="${el.type === 'income'? 'positive__amount' : ''}">${el.type === 'income'? '+' : '-'} ${el.amount}</p>
            </div>
        </div>
        `
    })

}


(() =>{
    if(sessionStorage.getItem("loggedin")){
        printSummary();      
        printRecentEntries();
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

