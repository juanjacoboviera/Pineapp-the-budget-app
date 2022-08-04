import { getLocalStorageItems, printSummary, radiosListener} from './functions.js';
import {iconSelector} from '../js/icons.js';

const [classInstance] = getLocalStorageItems();
const filterByEntryType = document.querySelector(".filter__inputs");
const filterByDescription = document.querySelector("#search__data");
const tableContent = document.querySelector("#tableContent");
let filteredArray
let newArray = []
const modal = document.querySelector(".modal__container")
const closeModal = document.querySelector("#closeModal")
const id = Math.random().toString(16).slice(2)
console.log(id)
// pagination Variables
const paginator = document.querySelector("#paginator__container")
let numberOfItems = classInstance.length
const numberPerPage = 4
const currentPage = 1
let numberOfPages = Math.ceil(numberOfItems/numberPerPage)

// pagination functions

const buildPage = (currPage, array) => {
    const trimStart = (currPage-1)*numberPerPage
    const trimEnd = trimStart + numberPerPage
    newArray = array.slice(trimStart, trimEnd)
    return newArray
}

function accomodatePage(clickedPage) {
    if (clickedPage <= 1) { return clickedPage + 1}
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

// Filter functions

const changeSelectOption = (type, category) => {
    let select = document.querySelector(category);
    let options = Array.from(select.options);
    let optionToSelect = options.find(item => item.value === type);
    select.value = optionToSelect.value;
  };

const searchDescription = (keyword, array) =>{
    return array.filter(el => el.description.toLowerCase().includes(keyword))
}

const selectType = (option, array) =>{
    return array.filter(el => el.type.toLowerCase().includes(option))
}

let filters = {
    description: "",
    type: "",
    date: ""
}

const printData = (pageNumber, array) =>{
    tableContent.innerHTML = "";
    filteredArray = searchDescription(filters.description, array)
    filteredArray = selectType(filters.type, filteredArray)
    numberOfItems = filteredArray
    let newList = buildPage(pageNumber, filteredArray)
    newList.map((el, i) =>{
        tableContent.innerHTML += `
        <tr class="tr__styles" data-id="${i}">
        <td><i data-type="${el.type}" class="fa-solid ${el.iconType} ${el.type === "income"? "icon__color2" : "icon__color"}"></i></td>
        <td>
            <i data-type="${el.category}" class="fa-solid ${el.iconCategory} iconBackground__circle table__icons"></i>
            ${el.category}
        </td>
        <td>${el.description}</td>
        <td class="${el.type === 'income'? 'positive__amount' : ''}">${el.type === 'income'? '+' : '-'} $${el.amount}</td>
        <td>${el.date}</td>
        <td>
            <button data-id="${i}" class="table__buttons editBtn"><i class="fa-solid fa-pencil"></i></button>
            <button data-id="${i}" class="table__buttons deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
        </td>
        </tr>
        `
    })
    const ediBtn = document.querySelectorAll(".editBtn")
    ediBtn.forEach(el =>{
        el.addEventListener("click", e =>{
            modal.classList.add("showModal")

           
            let description = document.querySelector("#description")
            let amount = document.querySelector("#amount");
            const date = document.querySelector("#date2");
            
            let trData = e.target.closest(".tr__styles");
            let tdType = trData.children[0].children[0].getAttribute("data-type");
            let tdCategory = trData.children[1].children[0].getAttribute("data-type");
            let tdDescription = trData.children[2].textContent
            let tdAmountString = trData.children[3].textContent
            const tdAmountNumbers = tdAmountString.replace(/\D/g, '');
            let tdDate = trData.children[4].textContent
            
            const incomeCategory = document.querySelector("#incomeCat");
            const expenseCategory = document.querySelector("#expenseCat");
            const categories = document.querySelectorAll(".categories");
            if(tdType === "income"){
                document.querySelector("#income").checked = true;
                document.querySelector("#incomeCategory").removeAttribute("disabled");
                expenseCategory.classList.add("hideCategory");
                incomeCategory.classList.remove("hideCategory");
                changeSelectOption(tdCategory,"#incomeCategory")
            }else{
                document.querySelector("#expense").checked = true;
                expenseCategory.classList.remove("hideCategory");
                incomeCategory.classList.add("hideCategory");
                changeSelectOption(tdCategory,"#expenseCategory")    
            }
            description.value = tdDescription;
            amount.value = tdAmountNumbers
            date.value = tdDate
            // console.log(tdCategory)
    
            
           
            

        })
    })
    return numberOfItems
}

radiosListener()

//EventListeners

paginator.addEventListener("click", e =>{
    filters.type = filterByEntryType.value
    let clickedPage = parseInt(e.target.value);
    // let selectedButton = e.target
    // selectedButton.classList.add("selected")
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
    printSummary() 
    printData(1, classInstance)
    buildPagination(currentPage)
}, false);

closeModal.addEventListener("click", e =>{
    e.preventDefault()
    modal.classList.remove("showModal")
})


