import { getLocalStorageItems, printSummary, radiosListener, failedEntryMsg, approvedEntryMsg, createEntriesClass, signOut} from './functions.js';
import {iconSelector} from './icons.js';
import { getAllEntries } from './services/entries.js';
import { API_URL } from "./services/apiConfig.js"

// generic variables
let entriesList
const pageContent = document.querySelector("#page__content")
const emptyTableContainer = document.querySelector(".noData__container")
const logOut = document.querySelector("#nav__link4");
const [classInstance] = getLocalStorageItems();
const filterByEntryType = document.querySelector(".filter__inputs");
const filterByDescription = document.querySelector("#search__data");
const tableContent = document.querySelector("#tableContent");
const modal = document.querySelector(".modal__container");
const closeModal = document.querySelector("#closeModal");
const saveEditEntryBtn = document.querySelector(".createEntryBtn");
let hiddenInput = document.querySelector("#index__Grabber");
let dateInput = document.getElementById('date__input')
let resetCalendarBtn = document.querySelector(".calendarBtn")
let filteredArray
let newArray = []
let newList = []

// edit entry variables
let radios = document.querySelectorAll(".radio");
let description = document.querySelector("#description")
let amount = document.querySelector("#amount");
let date = document.querySelector("#date2");
const incomeCategory = document.querySelector("#incomeCat");
const expenseCategory = document.querySelector("#expenseCat");
const categories = document.querySelectorAll(".categories");
let categoryIconInput = document.querySelector("#categoryTypeIcon");
let typeIconInput = document.querySelector("#EntryTypeIcon");
let categoryValue;
let entryType;

// pagination variables
const paginator = document.querySelector("#paginator__container")
// let numberOfItems = classInstance.length;
let numberOfItems 
const numberPerPage = 4;
const currentPage = 1;
let numberOfPages = Math.ceil(numberOfItems/numberPerPage)

// pagination functions

const buildPage = (currPage, array) => {
    const trimStart = (currPage-1)*numberPerPage;
    const trimEnd = trimStart + numberPerPage;
    newArray = array.slice(trimStart, trimEnd)
    return newArray;
}

function accomodatePage(clickedPage) {
    if (clickedPage <= 1) { return clickedPage + 1};
    if (clickedPage >= numberOfPages) { return clickedPage -1}
    return clickedPage
}

const buildPagination = (clickedPage) =>{
    paginator.textContent = ""
    const currPageNum = accomodatePage(clickedPage)
    if (numberOfPages >=3){
        for (let i=-1; i<2; i++) {  
            const number = document.createElement("button")
            number.classList.add("paginator__number")
            number.value = currPageNum+i
            number.textContent = currPageNum+i
            paginator.append(number)
        } 
    } else {
        for (let i=0; i<numberOfPages; i++) {
            const number = document.createElement("button")
            number.classList.add("paginator__number")
            number.value = i+1
            number.textContent = i+1
            paginator.append(number)
        }
        }
}


// filter functions & filter object

const changeSelectOption = (type, category) => {
    let select = document.querySelector(category);
    let options = Array.from(select.options);
    let optionToSelect = options.find(item => item.value === type);
    console.log(optionToSelect)
    return select.value = optionToSelect.value;
    
  };

const searchDescription = (keyword, array) =>{
    return array.filter(el => el.description.toLowerCase().includes(keyword))
}

const selectType = (option, array) =>{
    return array.filter(el => el.entryType.toLowerCase().includes(option))
}

const filterDates = (date1, date2, array) =>{
    let startDate =  Date.parse(date1)
    let endDate = Date.parse(date2)
   
   let result = array.filter(el => {
        let elementDate = Date.parse(el.date)
        // console.log(elementDate)
        return (date1 == "" || elementDate >= startDate) && (date2 == "" || elementDate <= endDate)
    })

    return result
}

let filters = {
    description: "",
    type: "",
    startDate: "",
    endDate: "",
}

// edit entry, clear modal form and print data functions 

const editEntry = () =>{
    let i = hiddenInput.value;
    newList[i].type = entryType ? entryType : newList[i].type
    newList[i].category = categoryValue ? categoryValue :  newList[i].category
    newList[i].description = description.value ? description.value : newList[i].description;
    newList[i].amount = parseFloat(amount.value);
    newList[i].date = date.value ? date.value : newList[i].date
    newList[i].iconCategory = categoryIconInput.value ? categoryIconInput.value : newList[i].iconCategory;
    newList[i].iconType = typeIconInput.value ? typeIconInput.value : newList[i].iconType;
     console.log(entryType)
     console.log(newList[i].type)
     console.log(newList[i].category)

     localStorage.setItem("entries", JSON.stringify(classInstance));
}

const clearForm = () =>{
    // look back in here and test to refactor.
    document.querySelector(".entry__form").reset()
    document.querySelector("#incomeCategory").setAttribute("disabled", "disabled");
    document.querySelector("#expenseCat").classList.add("hideCategory");
    document.querySelector("#incomeCat").classList.remove("hideCategory");
    categoryIconInput.value = null
    typeIconInput.value = null
    // refactor code above this line
    entryType = undefined
    categoryValue = undefined
    categoryValue = undefined
}

const printData = (pageNumber, array) =>{
    tableContent.innerHTML = "";
    filteredArray = searchDescription(filters.description, array)
    filteredArray = filterDates(filters.startDate, filters.endDate, filteredArray)
    filteredArray = selectType(filters.type, filteredArray)
    numberOfItems = filteredArray
    newList = buildPage(pageNumber, filteredArray)
    newList.map((el, i) =>{
        tableContent.innerHTML += `
        <tr class="tr__styles" data-id="${i}" data-obj-id="${el.id}">
        <td><i data-type="${el.entryType}" data-icon="${el.iconType}" class="fa-solid ${el.iconType} ${el.entryType === "income"? "icon__color2" : "icon__color"}"></i></td>
        <td>
            <i data-type="${el.category}" data-icon="${el.iconCategory}" class="fa-solid ${el.iconCategory} iconBackground__circle table__icons"></i>
            ${el.category}
        </td>
        <td>${el.description}</td>
        <td class="${el.entryType === 'income'? 'positive__amount' : ''}">${el.entryType === 'income'? '+' : '-'} $${el.amount}</td>
        <td>${el.date}</td>
        <td>
            <button data-id="${i}" class="table__buttons editBtn"><i class="fa-solid fa-pencil"></i></button>
            <button data-id="${i}" class="table__buttons deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
        </td>
        </tr>
        `
    })
    // edit and delete entry features start here
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    const ediBtn = document.querySelectorAll(".editBtn");
    
    ediBtn.forEach(el =>{
        el.addEventListener("click", e =>{
            modal.classList.add("showModal")

            // Variables to catch the values that will be placed inside the edit entry modal inputs
            let trData = e.target.closest(".tr__styles");
            let tdTypeIcon = trData.children[0].children[0].getAttribute("data-icon");
            let tdCategoryIcon = trData.children[1].children[0].getAttribute("data-icon");
            let tdType = trData.children[0].children[0].getAttribute("data-type");
           
            let tdCategory = trData.children[1].children[0].getAttribute("data-type");
            

            let tdDescription = trData.children[2].textContent
            let tdAmountString = trData.children[3].textContent
            let tdAmountNumbers = tdAmountString.replace(/\D/g, '');
            let tdDate = trData.children[4].textContent
          
            if(tdType === "income"){
                let radio1 = document.querySelector("#income");
                radio1.checked = true;
                document.querySelector("#incomeCategory").removeAttribute("disabled");
                expenseCategory.classList.add("hideCategory");
                incomeCategory.classList.remove("hideCategory");
                changeSelectOption(tdCategory,"#incomeCategory")
            }else{
                let radio2 = document.querySelector("#expense");
                radio2.checked = true;
                expenseCategory.classList.remove("hideCategory");
                incomeCategory.classList.add("hideCategory");
                changeSelectOption(tdCategory,"#expenseCategory")    
            }

            description.value = tdDescription;
            amount.value = tdAmountNumbers;
            date.value = tdDate;
            
            // check if we need this variable
            let dataId = e.target.closest(".table__buttons").getAttribute("data-id");
            hiddenInput.value = dataId;
                      
            categories.forEach(el =>{
                el.addEventListener("change", e =>{
                    categoryValue = e.target.value;
                    iconSelector(categoryValue, categoryIconInput)
                })

            })

            radios.forEach(el =>{
                el.addEventListener("click", e =>{
                    entryType = e.target.value;
                    iconSelector(entryType, typeIconInput)
                })

            })
        }

        
        )
    })

    deleteBtn.forEach((el, i) =>{
        el.addEventListener("click", e =>{
            swal("Are you sure you want to delete this entry?", {
                buttons: [true, "Yes"],
              }).then((willDelete) => {
                if(willDelete){
                    let trData = e.target.closest(".tr__styles").getAttribute("data-obj-id");
                    let foundEntry = classInstance.find(el => {
                        return el.id == trData
                    })
                    let index = classInstance.indexOf(foundEntry)
                    newList.splice(i, 1)
                    classInstance.splice(index,1);
                    localStorage.setItem("entries", JSON.stringify(classInstance));
                    printData(1, newList)
                    printSummary()
                    approvedEntryMsg("Entry deleted successfully")
                    if(classInstance.length == 0){
                        const totalSummary = document.querySelector("#total")
                        const incomeSummary = document.querySelector("#incomeValue")
                        const expensesSummary = document.querySelector("#expenses")
                        emptyTableContainer.classList.remove("hiddenData")
                        totalSummary.textContent = "$ 0"
                        incomeSummary.textContent = "$ 0"
                        expensesSummary.textContent = "$ 0"
                        emptyTableContainer.innerHTML = `
                        <img src="../img/infomsg3.svg" width="180px" height="auto" alt="">
                        <p>No data. You must log entries in the <a href="./newEntry.html">add entry tab</a></p>
                        `
                    }
                    

                }
            });
            
        })
    })

    return numberOfItems
}

//EventListeners

let calendar = flatpickr("#date__input", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    mode: "range",
    onClose: (dates) => {
        if(dates[0] || dates[1] != undefined){
            filters.startDate = dates[0].toISOString().slice(0, 10)
            filters.endDate = dates[1].toISOString().slice(0, 10)
        }
        else{
            console.log("Dates not selected")
        }
       
       
        numberOfItems =   printData(1, classInstance)
        numberOfPages = Math.ceil(numberOfItems.length/numberPerPage)
        buildPagination(1)
       
    //    console.log(filterDates(filters.startDate, filters.endDate, classInstance))
    }
    
});

resetCalendarBtn.addEventListener("click", e =>{
    e.preventDefault()
    calendar.clear()
    filters.startDate = ""
    filters.endDate = ""
    printData(1, classInstance)
    numberOfPages = Math.ceil(numberOfItems.length/numberPerPage)
    buildPagination(currentPage)

})

radiosListener()

paginator.addEventListener("click", e =>{
    filters.type = filterByEntryType.value
    let clickedPage = parseInt(e.target.value);

    if(isNaN(clickedPage)){return}
    numberOfItems =   printData(clickedPage, classInstance)
    numberOfPages = Math.ceil(numberOfItems.length/numberPerPage)
    buildPagination(clickedPage)
})

filterByDescription.addEventListener("keyup", e =>{
    filters.description = e.target.value;
    numberOfItems =   printData(1, classInstance)
    numberOfPages = Math.ceil(numberOfItems.length/numberPerPage)
    buildPagination(1)
})

filterByEntryType.addEventListener("change", e =>{
    filters.type = e.target.value;
    numberOfItems =   printData(1, classInstance)
    numberOfPages = Math.ceil(numberOfItems.length/numberPerPage)
    buildPagination(1)
})

document.addEventListener('DOMContentLoaded',() =>{
    const largeSpinner= document.querySelector(".spinner__large")
    const spinners = document.querySelectorAll('.spinner');
    const token = sessionStorage.getItem("token")
    if(!sessionStorage.getItem("token")){
        window.location.href = "http://127.0.0.1:5500/client/index.html"; 
        } else {
        pageContent.classList.remove("hidden")
        getAllEntries(token)
        .then(data => {
            entriesList = createEntriesClass(data.entries)
            numberOfItems = entriesList.length;
            if(entriesList.length == 0){
                largeSpinner.style.display = 'none'
                emptyTableContainer.innerHTML = `
                <img src="../img/infomsg3.svg" width="180px" height="auto" alt="">
                <p>No data. You must log entries in the <a href="./newEntry.html">add entry tab</a></p>
                `
            }else{
                emptyTableContainer.classList.add("hiddenData")
                printSummary(entriesList)
                printData(1, entriesList)
                buildPagination(currentPage)
            }
        }).finally(() => {
            spinners.forEach(spinner => spinner.style.display = 'none')
            largeSpinner.style.display = 'none'
          });}   
}, false);


closeModal.addEventListener("click", e =>{
    e.preventDefault()
    modal.classList.remove("showModal")
})


saveEditEntryBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(document.querySelector("#description").value.length === 0 || parseFloat(document.querySelector("#amount").value === isNaN()) || document.querySelector("#amount").value === '' || document.querySelector("#date2").value === ""){
        failedEntryMsg("You Must Fill out all Inputs")
    }else{
        editEntry()
        printSummary()
        printData(1, newList)
        modal.classList.remove("showModal")
        clearForm()
        approvedEntryMsg("Entry edited successfully")
    }
})

logOut.addEventListener("click", ()=>{
    signOut()
})

