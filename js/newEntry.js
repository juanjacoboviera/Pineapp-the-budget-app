import {entryIcons} from '../js/icons.js';

// variables
let entry;
const incomeOption = document.querySelector("#income");
const expenseOption = document.querySelector("#expense");
const categories = document.querySelectorAll(".categories");
const radios = document.querySelectorAll(".radio");
const iconInput = document.querySelector("#iconHolder");
let entryType;
let categoryValue;
const submitEntryBtn = document.querySelector(".createEntryBtn");
let entriesLog = [];


// Constructor

class Entry {
    constructor(type, category, description, amount, date, icon){
        this.type = type;
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.icon = icon
    }

    filterEntries(type){
        let filteredIncome = entriesLog.filter(el =>{
            return el.type.includes(type)
            })
           
            return filteredIncome
    }

    totalType(type){
        let filteredIncome = this.filterEntries(type);
        let amount = filteredIncome.map(el =>{
            return el.amount
        })
        
        let total = amount.reduce((previousValue, currentValue) =>{
            return previousValue + currentValue
        }, 0)
        return total 
    }

    totalBalance(){
        let income =this.totalType("income")
        let expenses =this.totalType("expense")
        return income - expenses;
    }
}


// functions
const iconSelector = () =>{
    console.log(entryType)
    let category = entryIcons.find(el =>{
        return el.type === categoryValue
    })
    iconInput.value = category.icon
}

const printSummary = () =>{
    document.querySelector("#income").textContent = `$ ${entry.totalType("income")}`;
    document.querySelector("#expenses").textContent = `$ ${entry.totalType("expense")}`;
    document.querySelector("#total").textContent = `$ ${entry.totalBalance()}`
}

const createEntry = () =>{
    const type = entryType;
    const category = categoryValue;
    const description = document.querySelector("#description").value;
    const amount = parseFloat(document.querySelector("#amount").value);
    const date = document.querySelector("#date2").value;

    entry = new Entry(type, category, description, amount, date, iconInput.value);
    entriesLog.push(entry);
    localStorage.setItem("entries", JSON.stringify(entriesLog))
}

const clearForm = () =>{
    document.querySelector(".entry__form").reset()
    document.querySelector("#categoryTitle").textContent = "Category"
    document.querySelector("#incomeCategory").setAttribute("disabled", "disabled");
    document.querySelector("#expenseCat").classList.add("hideCategory");
    document.querySelector("#incomeCat").classList.remove("hideCategory");
    categoryValue = undefined
   
}

const approvedEntryMsg =  () =>{
    Toastify({
        text: "Entry Registered Successfully",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#7f42ff",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}


const failedEntryMsg =  () =>{
    Toastify({
        text: "You Must Fill out all Inputs",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "rgb(244, 89, 89)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

// event listeners

for (const radio of radios) {
    // const incomeOption = document.querySelector("#income");
    // const expenseOption = document.querySelector("#expense");
    const incomeCategory = document.querySelector("#incomeCat");
    const expenseCategory = document.querySelector("#expenseCat");
    radio.onclick = (e) =>{
        if(e.target.value === "income" ){
            expenseOption.checked = false;
            expenseCategory.classList.add("hideCategory");
            incomeCategory.classList.remove("hideCategory");
            document.querySelector("#incomeCategory").removeAttribute("disabled");
            document.querySelector("#categoryTitle").textContent = "Income Category"
        } if(e.target.value === "expense"){
            incomeOption.checked = false;
            incomeCategory.classList.add("hideCategory");
            expenseCategory.classList.remove("hideCategory");
        }
        entryType = e.target.value;
        
    }
   
}

categories.forEach(el =>{
    el.addEventListener("change", e =>{
        categoryValue = e.target.value;
    })

})

submitEntryBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if(((expenseOption.checked = false) && (incomeOption.checked = false)) || categoryValue === undefined || document.querySelector("#description").value.length === 0 || parseFloat(document.querySelector("#amount").value === isNaN()) || document.querySelector("#amount").value === '' || document.querySelector("#date2").value === ""){
        failedEntryMsg()
        console.log("failed")
    }else{
    console.log("approved")
    iconSelector()
    createEntry();
    approvedEntryMsg()
    clearForm();
    console.log(entriesLog)
    document.querySelector("#income").textContent = "";
    document.querySelector("#expenses").textContent = "";
    document.querySelector("#total").textContent = ""
    printSummary()
    }

})

