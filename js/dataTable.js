import { getLocalStorageItems, printSummary } from './functions.js';

const [classInstance] = getLocalStorageItems();
const filterByEntryType = document.querySelector(".filter__inputs");
const filterByDescription = document.querySelector("#search__data");
const tableContent = document.querySelector("#tableContent");
let filteredArray
let newArray = []
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
    newList.map(el =>{
        tableContent.innerHTML += `
        <tr class="tr__styles" data-groups="${el.type === 'income'? "['income','all']" : "['expenses','all;]"}">
        <td><i class="fa-solid ${el.iconType} ${el.type === "income"? "icon__color2" : "icon__color"}"></i></td>
        <td>
            <i class="fa-solid ${el.iconCategory} iconBackground__circle table__icons"></i>
            ${el.category}
        </td>
        <td>${el.description}</td>
        <td class="${el.type === 'income'? 'positive__amount' : ''}">${el.type === 'income'? '+' : '-'} $${el.amount}</td>
        <td>${el.date}</td>
        <td>
            <button class="table__buttons"><i class="fa-solid fa-pencil"></i></button>
            <button class="table__buttons"><i class="fa-solid fa-trash-can"></i></button>
        </td>
        </tr>
        `
    })
    return numberOfItems
}

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
    console.log(numberOfItems)
    numberOfPages = Math.ceil(numberOfItems.length/numberPerPage)
    buildPagination(1)
})

filterByEntryType.addEventListener("change", e =>{
    filters.type = e.target.value;
    numberOfItems =   printData(1, classInstance)
    console.log(numberOfItems)
    numberOfPages = Math.ceil(numberOfItems.length/numberPerPage)
    buildPagination(1)

   
})

document.addEventListener('DOMContentLoaded',() =>{
    printSummary() 
    printData(1, classInstance)
    buildPagination(currentPage)
}, false);




