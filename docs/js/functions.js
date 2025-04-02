import Entry from './class.js'

const getLocalStorageItems = () =>{
    const localStorageEntries = JSON.parse(localStorage.getItem("entries"));
    let instanceEntry
    const classInstance = []
    if(localStorage.getItem("entries") === null){
        // console.log("LocalStorage is empty. No data to show.")
    } else{
        localStorageEntries.forEach(el =>{
            instanceEntry = new Entry(el.type, el.category, el.description, el.amount, el.date, el.iconCategory, el.iconType)
            return classInstance.push(instanceEntry)
        })
    }
    return [classInstance, instanceEntry];
}

const createEntriesClass = (entriesArray) =>{
    const classInstance = []
    entriesArray.forEach(el =>{
        const instanceEntry = new Entry(el.entryType, el.category, el.description, el.amount, el.date, el.iconCategory, el.iconType, el._id, el.entry_creator) 
        return classInstance.push(instanceEntry)
    })
    return classInstance
}

const printSummary = (entriesList) =>{
    // const [classInstance, instanceEntry] = getLocalStorageItems();
    if(!entriesList){
        // console.log("LocalStorage is empty. No data to work with.")
    }else {
        document.querySelector("#incomeValue").textContent = `$ ${totalType("income", entriesList)}`;
        document.querySelector("#expenses").textContent = `$ ${totalType("expense", entriesList)}`;
        document.querySelector("#total").textContent = `$ ${totalBalance(entriesList)}`
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

const divideSpendingbyCategory = (categories) => {
    const expensesByCategoryList = {}
    const expenses = categories.filter(category => category.entryType == "expense")
   
    expenses.map(expense =>{
        const category = expense.category
        if (expensesByCategoryList[category]) {
            expensesByCategoryList[category].push(expense.amount);
        } else {
            expensesByCategoryList[category] = [expense.amount];
        }
    })
   
    Object.keys(expensesByCategoryList).forEach(category => {
        const addCategoryTotal = expensesByCategoryList[category].reduce((previousValue, currentValue) =>{
                return expensesByCategoryList[category] = previousValue + currentValue
        }, 0)
      });

    return expensesByCategoryList
};

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

 const getObject = (value, array) =>{
    const elements = []
    if(value == "labels"){
        Object.keys(array).forEach(key => {
            return elements.push(key)     
          });
    }else{
        Object.values(array).forEach(categoryvalue => {
            return elements.push(categoryvalue)
          });
    }
    return elements
 }

const  filterEntries = (type, array) =>{
    let filteredIncome = array.filter(el =>{
        return el.entryType.includes(type)
        })
    
        return filteredIncome
}

const totalType = (type, array) => {
    let filteredIncome = filterEntries(type, array)
    let amount = filteredIncome.map(el =>{
        return el.amount
    })
    
    let total = amount.reduce((previousValue, currentValue) =>{
        return previousValue + currentValue
    }, 0)
    return total 
}

const totalBalance = (array) => {
    let income = totalType("income", array)
    let expenses = totalType("expense", array)
    return income - expenses;
}


 export{getLocalStorageItems, printSummary, radiosListener, approvedEntryMsg, failedEntryMsg,getCategoryTotal, divideSpendingbyCategory, createEntriesClass, totalBalance, totalType, filterEntries, getObject};