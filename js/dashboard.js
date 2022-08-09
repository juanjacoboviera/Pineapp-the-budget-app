import { printSummary, getLocalStorageItems } from "../js/functions.js";

// (() =>{
//     printSummary()
   
// })()


// variables
const logOut = document.querySelector("#nav__link4");
const recentEntriesContainer = document.querySelector(".generic__container")
let [classInstance] = getLocalStorageItems()



//functions

const printRecentEntries = () =>{
    recentEntriesContainer.innerHTML = "";
    let reversedEntries 
    let slicedEntries
    // console.log(reversedEntries)
    console.log(classInstance)
    if(classInstance.length >= 4){
        reversedEntries = classInstance.reverse()
        slicedEntries = reversedEntries.slice(0,4)
        // slicedEntries = classInstance.slice(0,4)
        // reversedEntries = slicedEntries.reverse()
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

