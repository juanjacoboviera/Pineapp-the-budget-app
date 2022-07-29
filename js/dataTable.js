import { getLocalStorageItems, printSummary } from './functions.js';
const [classInstance] = getLocalStorageItems();

(() =>{
    printSummary()
   
})()

console.log(classInstance)


classInstance.forEach(el =>{
    const tableContent = document.querySelector("#tableContent");
    tableContent.innerHTML += `
    <tr class="tr__styles">
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