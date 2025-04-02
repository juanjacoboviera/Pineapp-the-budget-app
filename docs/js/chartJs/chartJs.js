
import {  divideSpendingbyCategory, totalType, filterEntries, getObject } from "../functions.js";

// chart.js library object

const renderChartJs = (entriesList) =>{
    // let totalExpenses = instanceEntry? `$ ${instanceEntry.totalType("expense", classInstance)}` : "$ 0";
    let totalExpenses = entriesList? `$ ${totalType("expense", entriesList, filterEntries)}` : "$ 0";
    let graphContainer = document.querySelector("#graph")
    const spendingByCat = divideSpendingbyCategory(entriesList)

    const data = {
        labels: getObject('labels', spendingByCat),
        datasets: [{
          label: 'Your Spending',
          data: getObject('values', spendingByCat),
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
    
      // This instance renders the chart
      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

}

export{renderChartJs}