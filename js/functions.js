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
        document.querySelector("#income").textContent = `$ ${instanceEntry.totalType("income", classInstance)}`;
        document.querySelector("#expenses").textContent = `$ ${instanceEntry.totalType("expense", classInstance)}`;
        document.querySelector("#total").textContent = `$ ${instanceEntry.totalBalance(classInstance)}`
    }
    
 
 }

 export{getLocalStorageItems, printSummary};