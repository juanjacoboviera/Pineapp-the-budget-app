// variables

const categories = document.querySelectorAll(".categories");
const radios = document.querySelectorAll(".radio");
let entryType = "income";
let categoryValue 
const submitEntryBtn = document.querySelector(".createEntryBtn");
let entriesLog = []

// Constructor

class Entry {
    constructor(type, category, description, amount, date){
        this.type = type;
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.date = date;
    }
}

// functions
const createEntry = () =>{
    const type = entryType;
    const category = categoryValue;
    const description = document.querySelector("#description").value;
    const amount = parseFloat(document.querySelector("#amount").value);
    const date = document.querySelector("#date2").value;

    const entry = new Entry(type, category, description, amount, date);
    entriesLog.push(entry);

}


// event listeners

for (const radio of radios) {
    const incomeOption = document.querySelector("#income");
    const expenseOption = document.querySelector("#expense");
    const incomeCategory = document.querySelector("#incomeCat");
    const expenseCategory = document.querySelector("#expenseCat");
    radio.onclick = (e) =>{
        if(e.target.value === "income" ){
            expenseOption.checked = false;
            expenseCategory.classList.add("hideCategory");
            incomeCategory.classList.remove("hideCategory");
        } else if(e.target.value === "expense"){
            incomeCategory.classList.add("hideCategory");
            expenseCategory.classList.remove("hideCategory");
            incomeOption.checked = false;
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
    e.preventDefault()
    createEntry()

})



