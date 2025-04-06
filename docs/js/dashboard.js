import { printSummary, getLocalStorageItems, getCategoryTotal, createEntriesClass, signOut } from "../js/functions.js";
import { getAllEntries } from "./services/entries.js";
import { renderChartJs } from "./chartJs/chartJs.js";
import { API_URL } from "./services/apiConfig.js"
// generic variables
const logOut = document.querySelector("#nav__link4");
const recentEntriesContainer = document.querySelector(".generic__container")
const pageContent = document.querySelector("#page__content")
let entriesList = null
// let totalExpenses = instanceEntry? `$ ${instanceEntry.totalType("expense", classInstance)}` : "$ 0";

 
// exchange rate API call

// functions
var myHeaders = new Headers();
myHeaders.append("apikey", "rQXF9heikHGGGu2r1BEeiAchlRqKenhJ");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=EUR%2CJPY%2CCOP%2CCAD%2CGBP&base=USD", requestOptions)
  .then(response => response.text())
  .then(result => {
    const euroInput = document.querySelector("#euro");
    const gbpInput = document.querySelector("#gbp");
    const jpyInput = document.querySelector("#jpy");
    const cadInput = document.querySelector("#cad");
    const copInput = document.querySelector("#cop");

    const currencies = JSON.parse(result)
    const {EUR, COP, CAD, GBP, JPY} = currencies.rates;

    euroInput.textContent = EUR.toFixed(3);
    gbpInput.textContent = GBP.toFixed(3);
    jpyInput.textContent = JPY.toFixed(3);
    cadInput.textContent = CAD.toFixed(3);
    // copInput.textContent = COP.toFixed(2);
    copInput.textContent = COP.toLocaleString('en-US')
    
})
  .catch(error => console.log('error', error));


const printRecentEntries = (entriesList) =>{
    recentEntriesContainer.innerHTML = "";
    let reversedEntries 
    let slicedEntries
    if(entriesList.length >=1 || entriesList.length <= 4 ){
        reversedEntries = entriesList.reverse()
        slicedEntries = reversedEntries.slice(0,4)
    }
    slicedEntries.map(el =>{
        recentEntriesContainer.innerHTML += `
        <div class="recentEntries__card">
            <div class="left__section">
                <div class="entry__icon">
                     <i class="fa-solid ${el.iconCategory} iconBackground__circle table__icons"></i>
                </div>
                <div class="entry__category">
                     <h2>${el.category}</h2>
                     <p>${el.description}</p>
                </div>
            </div>
            <div class="right__section">
                <p class="${el.entryType === 'income'? 'positive__amount' : ''}">${el.entryType === 'income'? '+' : '-'} $${el.amount}</p>
            </div>
        </div>
        `
    })

}

document.addEventListener('DOMContentLoaded', () => {
      const spinners = document.querySelectorAll('.spinner');
      const largeSpinners = document.querySelectorAll('.spinner__large');
      const pieChart = document.querySelector("#myChart");

      const dataContainers = document.querySelectorAll('.generic__container');
     const token = sessionStorage.getItem("token")
     if(!sessionStorage.getItem("token")){
         window.location.href = "http://127.0.0.1:5500/client/index.html"; 
        } else {
        pageContent.classList.remove("hidden")
        getAllEntries(token)
        .then(data => {
          entriesList = createEntriesClass(data.entries)
          console.log(entriesList)
          renderChartJs(entriesList)
          printSummary(entriesList);  
          if(entriesList.length == 0){
              recentEntriesContainer.classList.add("noData__container")
              recentEntriesContainer.innerHTML = `
              <img src="../img/infomsg2.svg" width="150px" height="auto" alt=""> 
              <p>You have not created any entries.</p> 
              `
          }else{
              printRecentEntries(entriesList);
              pieChart.style.display = 'inline-block';
          }
          if(totalExpenses == "$ 0"){
              graphContainer.classList.add("noData__container")
              graphContainer.innerHTML = `
              <img src="../img/infomsg1.svg" width="150px" height="auto" alt=""> 
              <p>No data. You must log expenses in the add entry tab.</p> 
              `
          }    
        })
        .finally(() => {
            spinners.forEach(spinner => spinner.style.display = 'none')
            largeSpinners.forEach(spinner => spinner.style.display = 'none')
            dataContainers.forEach(spinner => spinner.classList.remove('flex_center'))
          });
    }
})


// eventListeners

logOut.addEventListener("click", ()=>{
    signOut()
})

