import Entry from '../js/class.js'

const getLocalStorageItems = () =>{
    const localStorageEntries = JSON.parse(localStorage.getItem("entries"));
    let instanceEntry
    const classInstance = []
    if(localStorage.getItem("entries") === null){
        console.log("LocalStorage is empty. No data to show.")
    } else{
        localStorageEntries.forEach(el =>{
            instanceEntry = new Entry(el.type, el.category, el.description, el.amount, el.date, el.iconCategory, el.iconType)
            return classInstance.push(instanceEntry)
        })
    }
    return [classInstance, instanceEntry];
}

const printSummary = () =>{
    const [classInstance, instanceEntry] = getLocalStorageItems();
    if(classInstance === [] || instanceEntry === undefined){
        console.log("LocalStorage is empty. No data to work with.")
    }else {
        document.querySelector("#incomeValue").textContent = `$ ${instanceEntry.totalType("income", classInstance)}`;
        document.querySelector("#expenses").textContent = `$ ${instanceEntry.totalType("expense", classInstance)}`;
        document.querySelector("#total").textContent = `$ ${instanceEntry.totalBalance(classInstance)}`
    }
    
 
 }

 const radiosListener = () =>{
    const incomeOption = document.querySelector("#income");
    const expenseOption = document.querySelector("#expense");
    const radios = document.querySelectorAll(".radio");
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
            return e.target.value;
            
        }
       
    }

}

const approvedEntryMsg =  (msg) =>{
    Toastify({
        text: msg,
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

const failedEntryMsg =  (msg) =>{
    Toastify({
        text: msg,
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

const getCategoryTotal = (array, type, category) =>{
    const filteredType = array.filter(el =>{
         return el.type == type
     })
     const filteredCategory = filteredType.filter(el =>{
         return el.category == category 
     })
     const categoryValues = filteredCategory.map(el =>{
         return el.amount
     })
     const totalCategory = categoryValues.reduce((previousValue, currentValue) =>{
         return previousValue + currentValue
     }, 0)
     return totalCategory
 }


 export{getLocalStorageItems, printSummary, radiosListener, approvedEntryMsg, failedEntryMsg,getCategoryTotal};