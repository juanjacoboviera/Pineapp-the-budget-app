import { getLocalStorageItems, printSummary, radiosListener, failedEntryMsg, approvedEntryMsg } from './functions.js';
import {iconSelector} from '../js/icons.js';
import Entry from '../js/class.js'

// generic variables
let entry;
const logOut = document.querySelector("#nav__link4");
const incomeOption = document.querySelector("#income");
const expenseOption = document.querySelector("#expense");
const categories = document.querySelectorAll(".categories");
const radios = document.querySelectorAll(".radio");
const categoryIconInput = document.querySelector("#categoryTypeIcon");
const typeIconInput = document.querySelector("#entryTypeIcon");
let entryType;
let categoryValue;
const submitEntryBtn = document.querySelector(".createEntryBtn");
let entriesLog = [];


(() =>{
    if(sessionStorage.getItem("loggedin")){
        printSummary()
    } else {
        window.location.href = "https://juanjacoboviera.github.io/Pineapp-the-budget-app/index.html";
    }
})()


const createEntry = () =>{
    const type = entryType;
    const category = categoryValue;
    const description = document.querySelector("#description").value;
    const amount = parseFloat(document.querySelector("#amount").value);
    const date = document.querySelector("#date2").value;

    entry = new Entry(type, category, description, amount, date, categoryIconInput.value, typeIconInput.value);
    if(localStorage.getItem("entries") === null){
        entriesLog.push(entry);
        localStorage.setItem("entries", JSON.stringify(entriesLog));
    } else{
        const newEntriesLog = JSON.parse(localStorage.getItem("entries"));
        newEntriesLog.push(entry);
        localStorage.setItem("entries", JSON.stringify(newEntriesLog));
    }

}

const clearForm = () =>{
    document.querySelector(".entry__form").reset()
    document.querySelector("#categoryTitle").textContent = "Category"
    document.querySelector("#incomeCategory").setAttribute("disabled", "disabled");
    document.querySelector("#expenseCat").classList.add("hideCategory");
    document.querySelector("#incomeCat").classList.remove("hideCategory");
    categoryValue = undefined
}

// event listeners

categories.forEach(el =>{
    el.addEventListener("change", e =>{
        categoryValue = e.target.value;
    })

})

radios.forEach(el =>{
    el.addEventListener("click", e =>{
        entryType = e.target.value;
    })

})

radiosListener()

submitEntryBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if(((expenseOption.checked = false) && (incomeOption.checked = false)) || categoryValue === undefined || document.querySelector("#description").value.length === 0 || parseFloat(document.querySelector("#amount").value === isNaN()) || document.querySelector("#amount").value === '' || document.querySelector("#date2").value === ""){
        failedEntryMsg("You Must Fill out all Inputs")
        console.log("failed")
    }else{
    console.log("approved")
    iconSelector(categoryValue, categoryIconInput)
    iconSelector(entryType, typeIconInput)
    createEntry();
    approvedEntryMsg("Entry Registered Successfully")
    clearForm();
    console.log(entriesLog)
    printSummary()
    }

})

logOut.addEventListener("click", ()=>{
    sessionStorage.removeItem("loggedin")
    window.location.href = "https://juanjacoboviera.github.io/Pineapp-the-budget-app/index.html";
})


export{getLocalStorageItems};
