import { getLocalStorageItems, printSummary } from './functions.js';

(() =>{
    printSummary() 
})()

const [classInstance] = getLocalStorageItems();
const filterByEntryType = document.querySelector(".filter__inputs");
const filterByDescription = document.querySelector("#search__data");
const tableContent = document.querySelector("#tableContent");
let filteredArray
// pagination Variables
const numberOfItems = classInstance.length
const numberPerPage = 4
const currentPage = 1
const numberOfPages = Math.ceil(numberOfItems/numberPerPage)


console.log(classInstance)


const searchDescription = (keyword, array) =>{
    return array.filter(el => el.description.toLowerCase().includes(keyword))
}

const selectType = (option, array) =>{
    return array.filter(el => el.type.toLowerCase().includes(option))
}

let filters = {
    description: "",
    type: "e",
    date: ""
}


const printData = () =>{
    tableContent.innerHTML = "";
    filteredArray =   searchDescription(filters.description, classInstance)
    filteredArray = selectType(filters.type, filteredArray)
    filteredArray.map(el =>{
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
    })}

filterByDescription.addEventListener("keyup", e =>{
    filters.description = e.target.value;
    console.log(filters.description)
    return printData()
})

filterByEntryType.addEventListener("change", e =>{
    if(e.target.value === "income" || e.target.value === "expense"){
        filters.type = e.target.value;
        return printData()
    } else{
        filters.type = "e";
        return printData()
    }
   
})

// pagination function
const buildPage = (currPage) => {
    const trimStart = (currPage-1)*numberPerPage
    const trimEnd = trimStart + numberPerPage
    console.log(filteredArray.slice(trimStart, trimEnd))
}


printData()