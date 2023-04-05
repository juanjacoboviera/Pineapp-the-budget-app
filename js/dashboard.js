import { printSummary, getLocalStorageItems, getCategoryTotal } from "../js/functions.js";

// generic variables
const logOut = document.querySelector("#nav__link4");
const recentEntriesContainer = document.querySelector(".generic__container")
let [classInstance, instanceEntry] = getLocalStorageItems()
// chart variables
let homeCategory = getCategoryTotal(classInstance, "expense", "home");
let transportCategory = getCategoryTotal(classInstance, "expense", "transport");
let foodCategory = getCategoryTotal(classInstance, "expense", "food");
let shoppingCategory = getCategoryTotal(classInstance, "expense", "shopping");
let healthCategory = getCategoryTotal(classInstance, "expense", "health");
let entertainmentCategory = getCategoryTotal(classInstance, "expense", "entertainment");
let petsCategory = getCategoryTotal(classInstance, "expense", "pets");
let travelCategory = getCategoryTotal(classInstance, "expense", "travel");
let technologyCategory = getCategoryTotal(classInstance, "expense", "technology");
let educationCategory = getCategoryTotal(classInstance, "expense", "education");
let taxesCategory = getCategoryTotal(classInstance, "expense", "taxes");
let insuranceCategory = getCategoryTotal(classInstance, "expense", "insurance");
let debtPaymentCategory = getCategoryTotal(classInstance, "expense", "debtPayment");
let companyCategory = getCategoryTotal(classInstance, "expense", "myBusiness");
let otherCategory = getCategoryTotal(classInstance, "expense", "other");
let totalExpenses = instanceEntry? `$ ${instanceEntry.totalType("expense", classInstance)}` : "$ 0";
let graphContainer = document.querySelector("#graph")



// chart.js library object
const data = {
    labels: ['Home', 'Transport', 'Food', 'Shopping', 'Health', 'Entertainment', 'Pets', 'Travel', 'Technology', 'Education', 'Taxes', 'Insurance','Debt Payment', 'Company', 'Other'],
    datasets: [{
      label: 'Your Spending',
      data: [homeCategory, transportCategory, foodCategory, shoppingCategory, healthCategory, entertainmentCategory, petsCategory, travelCategory, technologyCategory, educationCategory, taxesCategory, insuranceCategory, debtPaymentCategory, companyCategory, otherCategory],
      backgroundColor: [
        'rgba(76, 201, 240, 1)',
        'rgba(72, 149, 239, 1)',
        'rgba(67, 97, 238, 1)',
        'rgba(63, 55, 201, 1)',
        'rgba(58, 12, 163, 1)',
        'rgba(247, 37, 153, 1)',
        'rgba(244, 89, 89, 1)',
        'rgba(114, 9, 183, 1)',
        'rgba(247, 37, 133, 1)',
        
      ],
      borderColor: [
        'rgba(76, 201, 240, 1)',
        'rgba(72, 149, 239, 1)',
        'rgba(67, 97, 238, 1)',
        'rgba(63, 55, 201, 1)',
        'rgba(58, 12, 163, 1)',
        'rgba(247, 37, 153, 1)',
        'rgba(244, 89, 183, 1)',
        'rgba(114, 9, 183, 1)',
        'rgba(247, 37, 133, 1)',
        

      ],
      borderWidth: 1,
      cutout: '60%'
    }]
  };
//   center text plugin
const centerText = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, options){
        const {ctx, chartArea: {left, right, top, bottom, width, height } } = chart;
        
        ctx.save();
        

        ctx.font = '400 15px Montserrat';
        ctx.fillstyle = 'rgba(255, 99, 132)';
        ctx.textAlign = 'center'

        // ctx.fillText('Total', 220, 115)
      


        ctx.font = '600 15px Montserrat';
        ctx.fillstyle = 'rgba(255, 99, 132)';
        ctx.textAlign = 'center'
        // ctx.fillText(totalExpenses, 220, 135)
        console.log(totalExpenses)
        if(totalExpenses !== "$ 0"){
            ctx.fillText('Total', width / 1.85, height / 2 + top)
            ctx.fillText(totalExpenses, width / 1.85, height / 2 + 35)
        }
    }
   }
  // config 
  const config = {
    type: 'doughnut',
    data,
    options: {
        layout:{
            padding: 20
        },
        responsive: true,
        maintainAspectRatio: false, 
        labels:{
            display: false,
        },
        plugins: {
            legend: {
              display: false,
            },
            datalabels: {
                color: 'white',
                formatter: (value, context) =>{
                    const dataPoints = context.chart.data.datasets[0].data;
                    if(value === 0){return null }
                    function totalSum(total, dataPoint){
                        return total + dataPoint;
                    }
                    const totalValue = dataPoints.reduce(totalSum, 0)        
                    const percentageValue = (value / totalValue * 100).toFixed(0)
                    return `${percentageValue}%`
                },
            }
          }  
    },
    plugins: [ChartDataLabels, centerText], 
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
 
// exchange rate API call

functions
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


const printRecentEntries = () =>{
    recentEntriesContainer.innerHTML = "";
    let reversedEntries 
    let slicedEntries
    if(classInstance.length >=1 || classInstance.length <= 4 ){
        reversedEntries = classInstance.reverse()
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
                <p class="${el.type === 'income'? 'positive__amount' : ''}">${el.type === 'income'? '+' : '-'} $${el.amount}</p>
            </div>
        </div>
        `
    })

}


(() =>{
    if(sessionStorage.getItem("loggedin")){
        printSummary();  
        if(classInstance.length == 0){
            recentEntriesContainer.classList.add("noData__container")
            recentEntriesContainer.innerHTML = `
            <img src="../img/infomsg2.svg" width="150px" height="auto" alt=""> 
            <p>You have not created any entries.</p> 
            `
        }else{
            printRecentEntries();
        }
        if(totalExpenses == "$ 0"){
            console.log(shoppingCategory)
            graphContainer.classList.add("noData__container")
            graphContainer.innerHTML = `
            <img src="../img/infomsg1.svg" width="150px" height="auto" alt=""> 
            <p>No data. You must log expenses in the add entry tab.</p> 
            `
        }
           
        // printRecentEntries();
        console.log("success!")
    } else {
        window.location.href = "https://juanjacoboviera.github.io/Pineapp-the-budget-app/index.html";
    }
    
})()

// eventListeners

logOut.addEventListener("click", ()=>{
    sessionStorage.removeItem("loggedin")
    window.location.href = "https://juanjacoboviera.github.io/Pineapp-the-budget-app/index.html";
})

